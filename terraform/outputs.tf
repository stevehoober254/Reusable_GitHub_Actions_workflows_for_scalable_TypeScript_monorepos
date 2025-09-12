# Output the name of the EKS cluster, useful for other workflows.
output "cluster_name" {
  description = "The name of the EKS cluster"
  value       = module.eks.cluster_name
}

# Output the ECR repository URLs for the two applications.
output "api_ecr_repo_url" {
  description = "The URL of the ECR repository for the API"
  value       = aws_ecr_repository.api_repo.repository_url
}

output "nextjs_ecr_repo_url" {
  description = "The URL of the ECR repository for the Next.js app"
  value       = aws_ecr_repository.nextjs_repo.repository_url
}