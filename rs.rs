use std::collections::HashMap;
use std::fmt;
use std::error::Error;
use std::sync::{Arc, Mutex};
use std::thread;
use std::time::Duration;
use regex::Regex;

// Custom error type
#[derive(Debug)]
struct MyError {
    code: u32,
    message: String,
}

impl fmt::Display for MyError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "Error {}: {}", self.code, self.message)
    }
}

impl Error for MyError {}

// Trait definition
trait Worker {
    fn work(&self) -> Result<(), Box<dyn Error>>;
    fn id(&self) -> &str;
}

// Struct implementing trait
struct Task {
    id: String,
    duration: Duration,
}

impl Worker for Task {
    fn work(&self) -> Result<(), Box<dyn Error>> {
        thread::sleep(self.duration);
        println!("Task {} completed", self.id);
        Ok(())
    }
    fn id(&self) -> &str {
        &self.id
    }
}

// Generic function
fn add<T: std::ops::Add<Output = T>>(a: T, b: T) -> T {
    a + b
}

// Function using regex crate
fn find_matches(pattern: &str, text: &str) -> Vec<String> {
    let re = Regex::new(pattern).unwrap();
    re.find_iter(text).map(|mat| mat.as_str().to_string()).collect()
}

fn main() -> Result<(), Box<dyn Error>> {
    // Vector of boxed trait objects
    let tasks: Vec<Box<dyn Worker>> = vec![
        Box::new(Task { id: "task1".to_string(), duration: Duration::from_secs(1) }),
        Box::new(Task { id: "task2".to_string(), duration: Duration::from_secs(2) }),
    ];

    // Multithreading with Arc and Mutex
    let results = Arc::new(Mutex::new(HashMap::new()));
    let mut handles = vec![];

    for task in tasks {
        let results = Arc::clone(&results);
        let task_id = task.id().to_string();

        let handle = thread::spawn(move || {
            if let Err(e) = task.work() {
                eprintln!("Error in {}: {}", task_id, e);
                let mut res = results.lock().unwrap();
                res.insert(task_id, format!("Failed: {}", e));
            } else {
                let mut res = results.lock().unwrap();
                res.insert(task_id, "Success".to_string());
            }
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    let results = results.lock().unwrap();
    for (id, status) in results.iter() {
        println!("{} -> {}", id, status);
    }

    // Using generic function
    let sum = add(5, 7);
    println!("Sum of 5 and 7 is {}", sum);

    // Regex matches
    let text = "Hello 123, this is Rust 2025!";
    let words = find_matches(r"\b\w{4,}\b", text);
    println!("Words with length >=4: {:?}", words);

    // Custom error usage
    let err = MyError { code: 404, message: "Not Found".to_string() };
    println!("Custom error display: {}", err);

    Ok(())
}
