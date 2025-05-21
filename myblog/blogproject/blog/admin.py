from django.contrib import admin
from .models import Post, Tag, Comment

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 0

class PostAdmin(admin.ModelAdmin):
    inlines = [CommentInline]
    list_display = ('title', 'author', 'date_posted')
    list_filter = ('tags', 'date_posted')
    search_fields = ('title', 'content')

admin.site.register(Post, PostAdmin)
admin.site.register(Tag)
admin.site.register(Comment)