from django.db import models
import uuid
from PIL import Image

def random_filename(instance, filename):
    ext = filename.split('.')[-1]
    unique_id = uuid.uuid4().hex
    return f'mockups/{unique_id}.{ext}'


# Create your models here.
class Work(models.Model):
    name = models.CharField(max_length=60)
    slug = models.CharField(max_length=60)
    job = models.CharField(max_length=60)
    time = models.DecimalField(max_digits=6, decimal_places=0)
    responsiblity = models.CharField(max_length=70)
    about = models.TextField()
    tech = models.JSONField(blank=True, null=True)
    main_mockup = models.ImageField(upload_to =random_filename)
    thumbnail = models.ImageField(upload_to =random_filename, blank=True)
    main_text = models.TextField()

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)

        if self.thumbnail:
            # Open the image using Pillow
            image = Image.open(self.thumbnail.path)

            # Calculate the new height to maintain the original aspect ratio
            original_width, original_height = image.size
            new_width = 750
            new_height = int((new_width / original_width) * original_height)

            # Resize the image
            image = image.resize((new_width, new_height))

            # Save the resized image back to the same path
            image.save(self.thumbnail.path)

class Mockups(models.Model):
    work = models.ForeignKey(Work, on_delete=models.CASCADE)
    mockups = models.ImageField(upload_to =random_filename)

class Service(models.Model):
    title = models.CharField(max_length=60)
    about = models.TextField()
