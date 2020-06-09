pipeline {
  agent {
    docker {
      image 'node:12-alpine'
    }

  }
  stages {
    stage('install dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('build') {
      steps {
        sh 'npm run build'
      }
    }

  }
}