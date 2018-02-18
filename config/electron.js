const variables = [
  {
    name: "gas",
    alerts: {
      less_than: 5
    }
  },
  {
    name: "temperature",
    alerts: {
      less_than: -40,
      more_than: 40
    }
  },
  {
    name: "motion"
  },
  {
    name: "humidity",
    alerts: {
      more_than: 50
    }
  },
  {
    name: "noise",
    alerts: {
      more_than: 1750
    }
  }
]
module.exports = {
  mock: {
    protocol: "http",
    host: "52.53.149.194:8080",
    apiVersion: "v1",
    registered: {
      variables
    }
  },
  production: {
    protocol: "https",
    host: "api.particle.io",
    apiVersion: "v1",
    registered: {
      variables
    }
  }
};