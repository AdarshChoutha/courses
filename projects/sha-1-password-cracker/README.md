# SHA-1 Password Cracker

This project is a completed implementation of the freeCodeCamp Information Security – SHA-1 Password Cracker challenge.

It demonstrates how weak hashing algorithms like SHA-1 can be cracked using a known password list and optional salting techniques.

## Features
- Cracks SHA-1 hashed passwords using a known password list
- Supports salted and unsalted hashes
- Uses Python’s built-in hashlib library
- Includes unit tests to validate all required cases
- Follows freeCodeCamp project specifications exactly

## Installation

1. Clone the repository or download the project files.

2. Create and activate a Python virtual environment (recommended):
	```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

## Usage
Run the project (development mode)
```bash
python3 main.py
```

## Testing
Run all unit tests using:
```bash
python3 test_module.py
```

**The function returns**:
- The cracked password if found.
- `PASSWORD NOT IN DATABASE` if no match exists.
