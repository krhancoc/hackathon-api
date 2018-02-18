docker-machine create -d amazonec2 $1
docker-machine ssh $1 -- sudo usermod -aG docker ubuntu
docker-machine ssh $1 -- docker run -d \
          -e DEVICE_ID=$1 \
          -e CONFIG_TIMEOUT=60 -e ACCESS_TOKEN=$2 \
          khancock/poller
