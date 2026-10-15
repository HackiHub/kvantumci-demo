# kvantumci-demo

> **Warning: demo purposes only — unsafe for real use.** This repository intentionally contains vulnerabilities and insecure configurations to demonstrate KvantumCI findings. Do not deploy it, use it in production, or copy its configurations into real systems. This applies to every branch, including `demo/hardened`.

Static repository fixtures with deliberate security findings for KvantumCI demos. No HTTP server, running application, deployment, or external credentials are needed. Credentials are fictional; Kubernetes images and resources are illustrative.

Scan this repository and select a branch in KvantumCI:

| Branch | Scenario |
| --- | --- |
| `main` | Vulnerable baseline: inline credentials, privileged/root container, mutable images, missing probes/resources, and weak CI configuration. |
| `demo/ci-fixed` | Fixes action pinning, PR trigger, and deterministic npm installation; infrastructure findings remain. |
| `demo/hardened` | Also fixes the selected Kubernetes and credential findings and adds `.dockerignore`. Other controls still fail, including the mutable Docker base image. |

Verified with the local rule engine:

| Rule | Finding | main | ci-fixed | hardened |
| --- | --- | --- | --- | --- |
| 12 | Secret pattern | FAIL | FAIL | PASS |
| 19 | Docker base image digest | FAIL | FAIL | FAIL |
| 50 | Kubernetes image digest | FAIL | FAIL | PASS |
| 51 | Kubernetes security context | FAIL | FAIL | PASS |
| 63 | Kubernetes secrets/network exposure | FAIL | FAIL | PASS |
| 64 | Kubernetes resources and probes | FAIL | FAIL | PASS |
| 75 | GitHub Actions commit pinning | FAIL | PASS | PASS |
| 78 | `pull_request_target` trigger | FAIL | PASS | PASS |
| 79 | Deterministic npm installation | FAIL | PASS | PASS |

Files to inspect: `.github/workflows/ci.yml`, `Dockerfile`, and `deploy/k8s.yaml`. The hardened Kubernetes image digest is a placeholder; manifests are scan examples, not deployable resources. “Hardened” describes these selected fixes, not a clean scan or production readiness.

To scan locally from the sibling `rule-engine` directory after checking out a branch:

```sh
.venv/bin/python main.py --source-type github --source-path ../kvantumci-demo --output-format json --max-workers 1
```

The report is written to `rule-engine/output.json`. Optional metadata check: `npm run check`. No npm dependencies are required. Provider settings and enabled rules can change results in hosted scans.
