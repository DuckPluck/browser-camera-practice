#/usr/bin/env bash
echo "Deploy values:"
echo "env: ${DEPLOY_ENV:?}"
echo "version: ${IMAGE_VERSION_TAG:?}"
echo "ingress: ${DEPLOY_INGRESS_DOMAIN:?}"
echo "repo: ${IMAGE_REGISTRY_URL:?}"
