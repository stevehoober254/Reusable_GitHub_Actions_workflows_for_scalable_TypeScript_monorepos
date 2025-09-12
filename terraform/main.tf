# This configuration provisions a VPC, an EKS cluster, and an ECR repository.

# Configure the AWS provider
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

# Use the official EKS module to provision the cluster.
# This module simplifies the process and follows best practices.
module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  vpc_id                   = module.vpc.vpc_id
  subnet_ids               = module.vpc.private_subnets
  enable_irsa              = true # Enable IAM Roles for Service Accounts

  eks_managed_node_groups = {
    general = {
      instance_types = [var.instance_type]
      min_size       = 1
      max_size       = 3
      desired_size   = 2
    }
  }

  tags = {
    Project     = "monorepo-deployment"
    Environment = "production"
  }
}

# Provision a VPC using the official VPC module.
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.0"

  name = "${var.cluster_name}-vpc"
  cidr = "10.0.0.0/16"

  azs             = data.aws_availability_zones.available.names
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.3.0/24", "10.0.4.0/24"]

  enable_nat_gateway     = true
  single_nat_gateway     = true
  enable_dns_hostnames   = true
  enable_dns_support     = true

  tags = {
    Project = "monorepo-deployment"
  }
}

# Provision an ECR repository for the Node.js API
resource "aws_ecr_repository" "api_repo" {
  name                 = "${var.cluster_name}-api"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# Provision an ECR repository for the Next.js app
resource "aws_ecr_repository" "nextjs_repo" {
  name                 = "${var.cluster_name}-nextjs"
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

# Get available AWS availability zones
data "aws_availability_zones" "available" {
  state = "available"
}
