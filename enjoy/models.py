from django.contrib.auth.models import User
from django.db import models
import uuid 
import re
from unicodedata import normalize

# Create your models here.
def uploadImageFormater(instance, filename):
    return 'thumbs/{}-{}'.format(str(uuid.uuid4()), filename)

def uploadLogoFormater(instance, filename):
    return 'logos/{}-{}'.format(str(uuid.uuid4()), filename)

class Categoria(models.Model):
    name = models.CharField(max_length=256, unique=True)
    def __str__(self):
        return self.name

class Post (models.Model):
    titulo = models.CharField(max_length=255, unique=True)
    foto = models.ImageField(upload_to=uploadImageFormater)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE)
    resumo = models.TextField(blank=True, null=True)
    conteudo = models.TextField(blank=True, null=True)
    autor = models.ForeignKey(User, on_delete=models.PROTECT)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo
    
    def save(self, *args, **kwargs):
        if self.foto and self.foto.name:
            self.foto.name = normalize('NFKD', self.foto.name).encode('ascii', 'ignore').decode('ascii')
        super(Post, self).save(*args, **kwargs)
    
class Documento (models.Model):
    name_doc = models.CharField(max_length=255)
    tipo = models.CharField(max_length=255)
    file = models.FileField(upload_to='documents')

    def __str__(self):
        return self.name_doc
    
    def save(self, *args, **kwargs):
        self.file.name = normalize('NFKD', self.file.name).encode('ascii', 'ignore').decode('ascii')
        existing_doc = Documento.objects.filter(name_doc=self.name_doc, tipo=self.tipo).first()
        
        if existing_doc:
            existing_doc.file.delete(save=False)  # Delete the old file from disk
            existing_doc.file = self.file  # Update the file with the new one
            existing_doc.tipo = self.tipo  # Update tipo if necessary
            super(Documento, existing_doc).save(*args, **kwargs)  # Save the existing document
        else:
            super(Documento, self).save(*args, **kwargs)

class Parcerias (models.Model):
    name = models.CharField(max_length=256, unique=True)
    logo = models.ImageField(upload_to=uploadLogoFormater)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = 'Parcerias'