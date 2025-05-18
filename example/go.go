package main

import (
    "context"
    "errors"
    "fmt"
    "log"
    "regexp"
    "sort"
    "sync"
    "time"
)

// Custom error type
type MyError struct {
    Code    int
    Message string
}

func (e *MyError) Error() string {
    return fmt.Sprintf("Error %d: %s", e.Code, e.Message)
}

// Interface declaration
type Worker interface {
    Work(ctx context.Context) error
    ID() string
}

// Struct implementing interface
type Task struct {
    id       string
    duration time.Duration
}

func (t *Task) Work(ctx context.Context) error {
    select {
    case <-time.After(t.duration):
        fmt.Printf("Task %s completed\n", t.id)
        return nil
    case <-ctx.Done():
        return ctx.Err()
    }
}

func (t *Task) ID() string {
    return t.id
}

// Generic-like function using empty interface (before Go 1.18)
func contains(slice []interface{}, val interface{}) bool {
    for _, item := range slice {
        if item == val {
            return true
        }
    }
    return false
}

// Sort interface implementation
type ByName []Task

func (a ByName) Len() int           { return len(a) }
func (a ByName) Swap(i, j int)      { a[i], a[j] = a[j], a[i] }
func (a ByName) Less(i, j int) bool { return a[i].id < a[j].id }

func main() {
    tasks := []Task{
        {"task1", 1 * time.Second},
        {"task3", 3 * time.Second},
        {"task2", 2 * time.Second},
    }

    // Sorting tasks by ID
    sort.Sort(ByName(tasks))
    fmt.Println("Sorted tasks:")
    for _, t := range tasks {
        fmt.Println(t.id)
    }

    ctx, cancel := context.WithTimeout(context.Background(), 1500*time.Millisecond)
    defer cancel()

    var wg sync.WaitGroup
    for _, task := range tasks {
        wg.Add(1)
        go func(t Task) {
            defer wg.Done()
            if err := t.Work(ctx); err != nil {
                log.Printf("Task %s failed: %v\n", t.id, err)
            }
        }(task)
    }
    wg.Wait()

    // Using regexp
    r := regexp.MustCompile(`^[a-z]+\d$`)
    testStrings := []string{"task1", "Task2", "abc3", "test!"}
    for _, s := range testStrings {
        fmt.Printf("Does '%s' match? %v\n", s, r.MatchString(s))
    }

    // Error handling with custom error
    err := performAction(false)
    if err != nil {
        var myErr *MyError
        if errors.As(err, &myErr) {
            fmt.Printf("Custom error occurred: %s\n", myErr)
        } else {
            fmt.Printf("Generic error: %v\n", err)
        }
    }
}

func performAction(success bool) error {
    if success {
        return nil
    }
    return &MyError{Code: 500, Message: "Something went wrong"}
}
