-- Module declaration
local M = {}

-- Local variables and constants
local PI = 3.14159
local VERSION = "1.0.0"

-- Function with multiple return values
local function calculateCircle(radius)
    if radius <= 0 then
        return nil, "Invalid radius"
    end
    local circumference = 2 * PI * radius
    local area = PI * radius ^ 2
    return circumference, area
end

-- Table with mixed keys and methods
local Circle = {}
Circle.__index = Circle

function Circle:new(radius)
    local self = setmetatable({}, Circle)
    self.radius = radius or 1
    return self
end

function Circle:getRadius()
    return self.radius
end

function Circle:setRadius(radius)
    if radius > 0 then
        self.radius = radius
    else
        error("Radius must be positive")
    end
end

function Circle:describe()
    local circ, area = calculateCircle(self.radius)
    if not circ then
        return "Error: invalid circle"
    end
    return string.format("Circle radius: %.2f, circumference: %.2f, area: %.2f", self.radius, circ, area)
end

-- Iterator function (coroutine style)
local function fibonacci(max)
    local a, b = 0, 1
    return coroutine.wrap(function()
        while a <= max do
            coroutine.yield(a)
            a, b = b, a + b
        end
    end)
end

-- Error handling with pcall
local function safeDivide(a, b)
    if b == 0 then
        error("Division by zero")
    end
    return a / b
end

function M.run()
    -- Create a Circle instance
    local c = Circle:new(5)
    print(c:describe())

    -- Change radius with error handling
    local status, err = pcall(function()
        c:setRadius(-3)
    end)
    if not status then
        print("Error:", err)
    end

    -- Fibonacci iteration
    print("Fibonacci sequence up to 50:")
    for num in fibonacci(50) do
        io.write(num, " ")
    end
    print()

    -- Safe division example
    local ok, result = pcall(safeDivide, 10, 0)
    if ok then
        print("Division result:", result)
    else
        print("Caught error:", result)
    end
end

return M
