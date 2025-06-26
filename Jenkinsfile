pipeline {
    agent any
    environment {
        // Example environment variables
        IMAGE_NAME = 'pokedesk'
        CONTAINER_PORT = '80'
        HOST_PORT = '80'
    }
    stages {
        stage('Checkout') {
            steps {
                // Pull code from SCM
                checkout scm
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Run Container') {
            steps {
                // Stop and remove any existing container
                sh 'docker rm -f $IMAGE_NAME || true'
                // Run the new container
                sh 'docker run -d --name $IMAGE_NAME -p $HOST_PORT:$CONTAINER_PORT $IMAGE_NAME'
            }
        }
    }
}