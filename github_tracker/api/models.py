from django.db import models

class Repository(models.Model):
    name = models.CharField(max_length=100)
    owner = models.CharField(max_length=100)
    url = models.URLField()
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.owner}/{self.name}"


class Issue(models.Model):
    repository = models.ForeignKey(Repository, related_name='issues', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=[('open', 'Open'), ('closed', 'Closed')],
        default='open'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Issue: {self.title} ({self.status})"


class PullRequest(models.Model):
    repository = models.ForeignKey(Repository, related_name='pull_requests', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=[('open', 'Open'), ('merged', 'Merged'), ('closed', 'Closed')],
        default='open'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"PR: {self.title} ({self.status})"


class Contributor(models.Model):
    repository = models.ForeignKey(Repository, related_name='contributors', on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    contributions = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.username
