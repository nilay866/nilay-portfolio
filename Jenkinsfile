pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'nilay866/nilay-portfolio'
        DOCKER_TAG = "${BUILD_NUMBER}"
        PRODUCTION_SERVER = '13.202.245.187'  // Production server IP
        CONTAINER_NAME = 'nilay-portfolio'
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main',
                    url: 'https://github.com/nilay866/nilay-portfolio.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    sh """
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest
                    """
                }
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                echo 'Pushing image to Docker Hub...'
                script {
                    withCredentials([usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )]) {
                        sh """
                            echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin
                            docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                            docker push ${DOCKER_IMAGE}:latest
                            docker logout
                        """
                    }
                }
            }
        }
        
        stage('Deploy to Production') {
            steps {
                echo 'Deploying to production server...'
                script {
                    sshagent(['production-server-ssh']) {
                        sh """
                            ssh -o StrictHostKeyChecking=no ubuntu@${PRODUCTION_SERVER} '
                                # Pull latest image
                                docker pull ${DOCKER_IMAGE}:latest
                                
                                # Stop and remove old container
                                docker stop ${CONTAINER_NAME} || true
                                docker rm ${CONTAINER_NAME} || true
                                
                                # Run new container
                                docker run -d \
                                    --name ${CONTAINER_NAME} \
                                    --restart unless-stopped \
                                    -p 80:80 \
                                    ${DOCKER_IMAGE}:latest
                                
                                # Clean up old images
                                docker image prune -af --filter "until=24h"
                            '
                        """
                    }
                }
            }
        }
        
        stage('Health Check') {
            steps {
                echo 'Performing health check...'
                script {
                    sleep(time: 10, unit: 'SECONDS')
                    sh """
                        curl -f http://${PRODUCTION_SERVER} || exit 1
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful! 🚀'
            echo "Application is live at: http://${PRODUCTION_SERVER}"
        }
        failure {
            echo 'Deployment failed! ❌'
        }
        always {
            echo 'Cleaning up workspace...'
            cleanWs()
        }
    }
}
