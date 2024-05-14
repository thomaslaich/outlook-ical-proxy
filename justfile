default:
    @just --list

# Autoformat the project tree
format:
    nix fmt

# Build entire project
build:
    npm run build

watch:
    npm run watch

clean:
    npm run clean

lint:
    npm run lint

start:
    npm run start

deploy: build
    func azure functionapp publish outlook-ical-proxy

# Run all tests and checks
check:
    nix flake check
