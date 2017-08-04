pipeline {
    // Pour être certain que tous les stages travail dans le même workspace
    agent any

    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
        timestamps()
    }

    environment {
        // Pour éviter une erreur: EACCES: permission denied, mkdir '/.npm'
        npm_config_cache = 'npm-cache'
        DOCKER_REPOSITORY = 'docker-local.maven.at.ulaval.ca/modul'
        DOCKER_REPOSITORY_URL = 'https://docker-local.maven.at.ulaval.ca'
    }

    stages {
        stage('Build') {
            agent { docker 'node:8.2-alpine'}
                /*docker {
                    image 'node:8.2-alpine'
                    reuseNode true
                }
            }*/

            steps {
                sh 'pwd'
                echo 'Clean up...'
                sh 'rm -rf dist'
                sh 'rm -rf node_modules'

                echo "Initializing npm..."
                sh 'npm install'

                echo "Building..."
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                echo 'Testing...'
                echo 'TO BE DONE !'
            }
        }

        stage('Docker') {
            agent {
                docker {
                    image 'node:8.2-alpine'
                    reuseNode true
                }
            }

            steps {
                sh 'docker build -t docker-local.maven.at.ulaval.ca/modul/modul-website:$npm_package_version .'

                withDockerRegistry(url: DOCKER_REPOSITORY_URL, credentialsId: 'artifactory-docker-registry-credential') {
                    sh 'npm run docker-push'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}