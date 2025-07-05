# See https://github.com/casey/just
set shell := ["zsh", "-uc"]
set windows-shell := ["pwsh.exe", "-NoLogo", "-Command"]

[private]
@default:
    just --choose --justfile {{justfile()}}

main:
    jj bookmark m main --to @-

push: typecheck build
    jj git push

typecheck:
    pnpm typecheck

build:
    pnpm build
