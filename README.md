# Serverless Machine Learning UI
This is a web application with built-in triggers to machine learning models powered by OpenFaaS. The aim of this project is to demonstrate how machine learning computations can be executed using an _on-premise_ serverless approach, instead of the traditional server model. Because the solution must be on-premise, cloud-based approaches are not considered; rather, this exploration seeks to use an **in-house server infrastructure but with the same functionality as a cloud-native model**. Namely, it must be able to:
1. Autoscale workloads up and down from zero

2. Allocate resources efficiently between different processes

For these reasons, the application is deployed on top of Kubernetes, which orchestrates these services automatically so developers can avoid dealing with underlying server infrastructures like routing, monitoring, scaling, etc.

> Note that this UI does not come automatically installed with the ML models since they are outsourced and deployed seperately with OpenFaaS to demonstrate a serverless architecture (see the [Deploying Machine Learning](#deploying-machine-learning) section for more details).

<p align="center">
  <img width="650" alt="diagrams" src="https://user-images.githubusercontent.com/64723727/89115176-ca9a4e00-d44a-11ea-8fcf-8ded4e855db6.png">
</p>

## Setup
### Prerequisites
* Docker CLI installed 

* A Kubernetes cluster with the kubectl CLI configured
  * For a single-node test cluster, setup Minikube using the instructions at https://kubernetes.io/docs/tasks/tools/install-minikube/
  
* OpenFaaS installed and deployed onto a Kubernetes cluster
  * CLI installation instructions: https://docs.openfaas.com/cli/install/
  * Kubernetes integration instructions: https://docs.openfaas.com/deployment/kubernetes/

### Deploying the UI
1. Clone this repository and CD into the folder.

2. Build the docker image from the Dockerfile.
```
  $ docker build -t faasml:test .
```
3. Create a Kubernetes deployment using the newly built Docker image.
```
  $ kubectl create deployment faasml --image=faasml:test
```
_Alternatively, you can avoid having to locally build the image and use the pre-built image from Docker Hub._
```
  $ kubectl create deployment faasml --image="docker.io/ryanrashid/faasml:v3"
```
4. Create a Kubernetes service from the deployment.
```
  $ kubectl expose deployment/faasml --type=LoadBalancer --port=5000
```
5. Access the URL for the service.
#### _Using Minikube_
```
  $ minikube service faasml --url
```
#### _Using kubectl_
```
  $ kubectl describe service faasml
```
Now, the basic UI is setup and should look as follows.

<img width="1373" alt="Screen Shot 2020-08-01 at 6 37 28 PM" src="https://user-images.githubusercontent.com/64723727/89112488-f4db1400-d428-11ea-900a-7b0d4bac0ae1.png"></img>
> Note: Since the UI only holds the triggers and not the models themselves, the next step is to setup the ML models on top of OpenFaaS and Kubernetes for the triggers to properly work.

### Deploying Machine Learning
Since the aim of this project is to explore serverless architectures through function as a service, the machine learning computation is not hosted on the formal application itself, but rather it is 'outsourced' to the Kubernetes cluster. The following is a useful diagram to help illustrate the process:

<p align="center">
  <img width="395" alt="architecture" src="https://user-images.githubusercontent.com/64723727/89115016-87d77680-d448-11ea-95ac-bd397ae3f65f.png">
</p>

Once again, this setup assumes that OpenFaaS has been properly installed and configured onto a Kubernetes cluster. If you need help setting up OpenFaas, see the [More Resources](#more-resources) section for a comprehensive tutorial on configuring OpenFaaS.

Repeat the following process for the four machine learning models ('Inception', 'Face blur by Endre Simo', 'Line Drawing Generator from a photograph', and 'Colorization'):
1. Access the OpenFaaS UI on port 8080, and click 'Deploy New Function'.

<p align="center">
  <img width="261" alt="deploy" src="https://user-images.githubusercontent.com/64723727/89113147-b3e7fd00-d432-11ea-9f11-e46cdb9ee6f3.png">
</p>

2. Find the model you want to deploy, and click 'Deploy' in the bottom right.

<p align="center">
  <img width="490" alt="store" src="https://user-images.githubusercontent.com/64723727/89113128-68355380-d432-11ea-8948-5ea8d5ea1c3b.png">
</p>

3. You should now see the function displayed in a list on the left.

<p align="center">
  <img width="190" alt="list" src="https://user-images.githubusercontent.com/64723727/89113152-ce21db00-d432-11ea-846f-144e220b0925.png">
</p>

Once all the models have been deployed, the UI triggers should properly call on these functions.

![Inception](https://user-images.githubusercontent.com/64723727/89112887-7afa5900-d42f-11ea-92e9-a1bede840ecd.jpg)

_________________

![Pigo](https://user-images.githubusercontent.com/64723727/89112891-8b123880-d42f-11ea-8c28-22cfe23eff34.jpg)

_________________

![Colorize](https://user-images.githubusercontent.com/64723727/89112897-982f2780-d42f-11ea-89fb-541c1d3abb44.jpg)

_________________

## More Resources
* [OpenFaaS Cookbook](https://github.com/ryanrashid/faasml/blob/master/resources/OpenFaas%20Cookbook.docx)
* [Knative Cookbook](https://github.com/ryanrashid/faasml/blob/master/resources/Knative%20Cookbook.docx) (Incomplete)
* [FaaS Initial Research & Findings](https://github.com/ryanrashid/faasml/blob/master/resources/FaaS%20Research.pptx)
