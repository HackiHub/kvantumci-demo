# kvantumci-demo

This repository is an intentionally vulnerable, non-deployable fixture for scan demonstrations.

Run it with `npm install && npm start`, test it with `npm test`, and scan it with your usual KvantumCI command.

The branches are `main`, `demo/ci-fixed`, and `demo/hardened`. `demo/ci-fixed` fixes rules 75, 78, and 79; the Kubernetes and Docker findings remain for the next hardening example. Unrelated controls may also show up.
