# Port Scanner

This project is a completed implementation of the FreeCodeCamp Information Security Port Scanner.

## Features
- Scan a host (hostname or IP) for open ports from a provided port list
- Optional verbose mode that resolves host names and prints details
- Includes unit tests for the scanner logic

## Installation
1. Create and activate a Python virtual environment (recommended):
	```bash
	python3 -m venv venv
	source venv/bin/activate
	```
2. Install dependencies (if any). This project uses only the Python standard library; no extra packages are required. If you add test deps, install them here.

## Run
There is an entrypoint included for development: `main.py`.

Run script:
```bash
python3 main.py
```

To use the scanner library directly, import `port_scanner` and call `get_open_ports(host, ports, verbose=False)`.

## Testing
Run the unit tests included in `test_module.py`:
```bash
python3 -m unittest test_module.py
```

## Notes
- Example usage in `main.py` demonstrates calling `get_open_ports` with hostnames, IPs, and the verbose flag.
- The scanner intentionally keeps dependencies minimal so it can run on constrained environments.
