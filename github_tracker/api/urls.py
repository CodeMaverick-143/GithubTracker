from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RepositoryViewSet, IssueViewSet, PullRequestViewSet, ContributorViewSet
from .views import RepositoryViewSet, IssueViewSet, PullRequestViewSet, ContributorViewSet


router = DefaultRouter()
router.register(r'repositories', RepositoryViewSet)
router.register(r'issues', IssueViewSet)
router.register(r'pull-requests', PullRequestViewSet)
router.register(r'contributors', ContributorViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
