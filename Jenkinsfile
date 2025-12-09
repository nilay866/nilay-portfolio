pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/nilay866/nilay-portfolio.git'
            }
        }

        stage('Build') {
            steps {
                echo "Building this project..."
            }
        }

        stage('Test') {
            steps {
                echo "Running this is test cases..."
            }
        }

        stage('Deploy') {
            steps {
                echo "Deploying application..."
            }
        }
    }
}
