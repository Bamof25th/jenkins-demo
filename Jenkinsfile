pipeline {
    agent any
    environment {
        IMAGE_NAME = 'pokedesk'
        CONTAINER_PORT = '80'
        HOST_PORT = '80'
    }
    stages {
        stage('Checkout') {
            steps {
                // Replace with your actual git repository URL
                git branch: 'main', url: 'https://github.com/Bamof25th/jenkins-demo'
            }
        }
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME .'
            }
        }
        stage('Run Container') {
            steps {
                sh 'docker rm -f $IMAGE_NAME || true'
                sh 'docker run -d --name $IMAGE_NAME -p $HOST_PORT:$CONTAINER_PORT $IMAGE_NAME'
            }
        }
    }
}
