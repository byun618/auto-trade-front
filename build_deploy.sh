#/bin/bash
version=$1

echo "Set Version: ${version}"

echo "Build Start"
docker build -t "byun618/auto-trade-front:${version}" .

echo "Push Start"
docker push "byun618/auto-trade-front:${version}"

echo "Rolling Update Start"
kubectl set image deployment/auto-trade-front auto-trade-front=byun618/auto-trade-front:${version}

echo "END "