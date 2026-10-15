# kvantumci-demo

This repository is an intentionally vulnerable, non-deployable static fixture for scan demonstrations.

Run `npm run check` and scan it with your usual KvantumCI command.

The branches are `main`, `demo/ci-fixed`, and `demo/hardened`. `demo/ci-fixed` fixes rules 75, 78, and 79; the Kubernetes and Docker findings remain for the next hardening example. Unrelated controls may also show up.
