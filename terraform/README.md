# Infrastructure Overview

The Terraform configuration provisions the following key resources on AWS:

- **VPC (Virtual Private Cloud)**: A dedicated, isolated virtual network for your resources.
- **EKS Cluster**: An Amazon Elastic Kubernetes Service cluster, which is a managed Kubernetes control plane.
- **Managed Node Group**: A group of EC2 instances that serve as the worker nodes for your EKS cluster.
- **IAM Roles**: Necessary IAM roles for the EKS cluster to interact with other AWS services.
- **ECR Repository**: An Amazon Elastic Container Registry to store your application's Docker images.

## Terraform Files

- **`main.tf`**: The main Terraform configuration file. It uses the `terraform-aws-modules/eks/aws` module to create the EKS cluster and related resources, simplifying the setup. It also provisions an ECR repository for your application images.

- **`variables.tf`**: Defines the input variables for the configuration, such as the cluster name and region.

- **`outputs.tf`**: Exports important values from the created infrastructure, like the EKS cluster name, which can be used in other workflows (e.g., for application deployment).

## GitHub Actions Workflow

The workflow, defined in `.github/workflows/terraform-apply.yml`, is triggered manually from the main branch. It performs the following steps:

1. **Checkout Code**: Clones the repository to the runner.
2. **Configure AWS Credentials**: Uses the `aws-actions/configure-aws-credentials` action to set up the necessary authentication using IAM role and OpenID Connect (OIDC), which is a best practice for secure CI/CD.
3. **Setup Terraform**: Installs a specific version of Terraform.
4. **Terraform Init**: Initializes the working directory, downloads provider plugins, and sets up the remote backend for state management.
5. **Terraform Plan**: Generates an execution plan and uploads it as an artifact. This is a crucial step for review and can be used for a separate pull request workflow.
6. **Terraform Apply**: Applies the changes defined in the plan to your AWS environment.

## Prerequisites

Before running this workflow, you must:

### Configure GitHub Secrets

- **`AWS_REGION`**: Your AWS region (e.g., `eu-nort-1`).
- **`AWS_OIDC_ROLE_ARN`**: The ARN of the IAM role that GitHub Actions will assume to provision resources.

### Create an IAM Role for GitHub Actions

- In your AWS account, create an IAM role that trusts the GitHub Actions OIDC provider.
- Attach a policy to this role that grants it permissions to provision resources (e.g., `AmazonEC2FullAccess`, `AmazonEKSClusterPolicy`, `AmazonEC2ContainerRegistryFullAccess`, etc.).

### Configure Your Repository

- Enable GitHub Actions in your repository.
- Add the required secrets in **Settings > Secrets and variables > Actions**.