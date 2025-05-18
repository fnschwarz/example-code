#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
#include <memory>
#include <map>
#include <functional>

// Enum class with underlying type
enum class Level : int {
    Low = 1,
    Medium = 5,
    High = 10
};

// Base class with virtual methods and destructor
class Shape {
public:
    virtual double area() const = 0;
    virtual std::string name() const = 0;
    virtual ~Shape() = default;
};

// Derived class
class Rectangle : public Shape {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double area() const override { return width * height; }
    std::string name() const override { return "Rectangle"; }
};

// Derived class with override and final specifier
class Circle final : public Shape {
    double radius;
public:
    explicit Circle(double r) : radius(r) {}
    double area() const override { return 3.14159 * radius * radius; }
    std::string name() const override { return "Circle"; }
};

// Template function with auto and decltype
template<typename T>
auto add(const T& a, const T& b) -> decltype(a + b) {
    return a + b;
}

int main() {
    std::vector<std::unique_ptr<Shape>> shapes;
    shapes.emplace_back(std::make_unique<Rectangle>(3.0, 4.0));
    shapes.emplace_back(std::make_unique<Circle>(2.0));

    std::cout << "Shapes and their areas:\n";
    for (const auto& shape : shapes) {
        std::cout << shape->name() << " area: " << shape->area() << '\n';
    }

    // Lambda expression with capture and auto parameters
    auto multiply = [](auto a, auto b) { return a * b; };
    std::cout << "Multiply 5 and 6: " << multiply(5, 6) << '\n';

    // Map with initializer list
    std::map<std::string, int> scores{
        {"Alice", 90},
        {"Bob", 85},
        {"Charlie", 95}
    };

    // Range-based for loop with structured binding (C++17)
    for (const auto& [name, score] : scores) {
        std::cout << name << " scored " << score << '\n';
    }

    // Exception handling with try-catch
    try {
        int divisor = 0;
        if (divisor == 0) throw std::runtime_error("Divide by zero error");
        std::cout << 10 / divisor << '\n';
    } catch (const std::exception& ex) {
        std::cerr << "Exception caught: " << ex.what() << '\n';
    }

    // Using enum class
    Level level = Level::Medium;
    if (level == Level::Medium) {
        std::cout << "Level is medium\n";
    }

    return 0;
}
