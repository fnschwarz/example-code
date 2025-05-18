#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Macro definition with parameters
#define MAX(a,b) ((a) > (b) ? (a) : (b))

// Enum declaration
enum Status {
    SUCCESS = 0,
    FAILURE = 1,
    PENDING = 2
};

// Struct definition with typedef
typedef struct {
    char name[50];
    int age;
} Person;

// Function declaration with pointer and const usage
const char* get_status_message(enum Status status);

// Function pointer typedef
typedef int (*CompareFunc)(const void*, const void*);

// Compare function for qsort
int compare_ages(const void* a, const void* b) {
    const Person* p1 = (const Person*)a;
    const Person* p2 = (const Person*)b;
    return p1->age - p2->age;
}

int main(void) {
    // Array of structs
    Person people[] = {
        {"Alice", 30},
        {"Bob", 25},
        {"Charlie", 35},
        {"Diana", 28}
    };

    size_t count = sizeof(people) / sizeof(people[0]);

    printf("Before sorting:\n");
    for (size_t i = 0; i < count; ++i) {
        printf("%s (%d years)\n", people[i].name, people[i].age);
    }

    // Using qsort with function pointer
    qsort(people, count, sizeof(Person), compare_ages);

    printf("\nAfter sorting by age:\n");
    for (size_t i = 0; i < count; ++i) {
        printf("%s (%d years)\n", people[i].name, people[i].age);
    }

    // Conditional compilation example
#ifdef DEBUG
    printf("Debug mode is enabled\n");
#endif

    enum Status current_status = SUCCESS;
    printf("\nStatus message: %s\n", get_status_message(current_status));

    // Using the macro
    int x = 10, y = 20;
    printf("Max of %d and %d is %d\n", x, y, MAX(x, y));

    return 0;
}

const char* get_status_message(enum Status status) {
    switch (status) {
        case SUCCESS: return "Operation succeeded";
        case FAILURE: return "Operation failed";
        case PENDING: return "Operation pending";
        default: return "Unknown status";
    }
}
