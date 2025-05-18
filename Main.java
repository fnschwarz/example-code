import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

// Enum with methods and fields
enum Priority {
    LOW(1), MEDIUM(5), HIGH(10);

    private final int level;

    Priority(int level) {
        this.level = level;
    }

    public int getLevel() {
        return level;
    }
}

// Interface with default method
interface Task {
    String getName();
    Priority getPriority();

    default void printInfo() {
        System.out.println("Task: " + getName() + ", Priority: " + getPriority());
    }
}

// Abstract base class
abstract class AbstractTask implements Task {
    protected String name;
    protected Priority priority;

    public AbstractTask(String name, Priority priority) {
        this.name = name;
        this.priority = priority;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Priority getPriority() {
        return priority;
    }
}

// Concrete class implementing interface
class SimpleTask extends AbstractTask {
    public SimpleTask(String name, Priority priority) {
        super(name, priority);
    }

    @Override
    public void printInfo() {
        System.out.println("[SimpleTask] " + name + " with priority " + priority);
    }
}

// Generic class with bounded type
class TaskManager<T extends Task> {
    private final List<T> tasks = new ArrayList<>();

    public void addTask(T task) {
        tasks.add(task);
    }

    public List<T> getTasksByPriority(Priority priority) {
        return tasks.stream()
            .filter(t -> t.getPriority() == priority)
            .collect(Collectors.toList());
    }

    public void sortByName() {
        tasks.sort(Comparator.comparing(Task::getName));
    }

    public void printAll() {
        tasks.forEach(Task::printInfo);
    }
}

// Custom checked exception
class TaskException extends Exception {
    public TaskException(String message) {
        super(message);
    }
}

public class Main {
    static {
        System.out.println("Static block executed");
    }

    private static final String APP_NAME = "Task Manager";

    public static void main(String[] args) {
        System.out.println("Welcome to " + APP_NAME);

        TaskManager<Task> manager = new TaskManager<>();

        // Lambda expression to create tasks
        Function<String, Task> createHighPriorityTask = name -> new SimpleTask(name, Priority.HIGH);

        try {
            manager.addTask(createHighPriorityTask.apply("Write report"));
            manager.addTask(new SimpleTask("Email client", Priority.MEDIUM));
            manager.addTask(new SimpleTask("Buy groceries", Priority.LOW));

            manager.sortByName();
            manager.printAll();

            List<Task> highPriorityTasks = manager.getTasksByPriority(Priority.HIGH);
            System.out.println("\nHigh priority tasks:");
            highPriorityTasks.forEach(Task::printInfo);

            // Simulate throwing exception
            checkTasks(manager);

        } catch (TaskException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }

    private static void checkTasks(TaskManager<Task> manager) throws TaskException {
        if (manager.getTasksByPriority(Priority.HIGH).isEmpty()) {
            throw new TaskException("No high priority tasks found!");
        }
    }
}