from django.shortcuts import render, redirect
from django.contrib import messages
from django.core.mail import send_mail
from .models import Post, Documento, Parcerias
from collections import OrderedDict
from django.db.models import Q

# Create your views here.
def index(request):
    noticias = Post.objects.all().order_by('-criado_em')
    parcerias = Parcerias.objects.all()
    return render(request, 'index.html', {'noticias': noticias, 'parcerias': parcerias})

def associacao(request):
    if request.POST:
        name = request.POST.get('name')
        crm = request.POST.get('crm')
        email = request.POST.get('email')
        telefone = request.POST.get('telefone')
        cep = request.POST.get('cep')
        address = request.POST.get('address')
        mensagem = request.POST.get('mensagem')
        send_mail(
            'Mensagem de {}: Cadastro'.format(name),
            'Nome: {} \nCRM: {} \nEmail: {} \nTelefone: {} \nCEP: {} \nEndereço: {} \nMensagem: {}'.format(name, crm, email, telefone, cep, address, mensagem),
            "ti@enjoysolucoes.med.br",
            ["contato@enjoysolucoes.med.br"],
            fail_silently=False,
        )
        messages.success(request, 'Formulário enviado com sucesso!')
        referer_url = request.META.get('HTTP_REFERER')
        if referer_url:
            return redirect(referer_url)
        else:
            return redirect('home')
    else:
        referer_url = request.META.get('HTTP_REFERER')
        if referer_url:
            return redirect(referer_url)
        else:
            return redirect('home')
        
def sobreNos(request):
    return render(request, 'sobre-nos.html')
        
def servicos(request):
    return render(request, 'servicos.html')

def transparencia(request):
    # Cria um OrderedDict para garantir a ordem dos dropdowns
    ordered_documents = OrderedDict([
        ("Alvará de Funcionamento", []),
        ("Atestados de Capacidade Técnica", []),
        ("Regularidade Fiscal Matriz - São Paulo/SP", []),
        # Adicione mais tipos de documentos conforme necessário
    ])
    
    documentos = Documento.objects.all()
    
    # Organiza os documentos de acordo com o tipo esperado
    for document in documentos:
        tipo_documento = document.tipo
        # Verifica se o tipo de documento está nos tipos ordenados
        if tipo_documento in ordered_documents:
            ordered_documents[tipo_documento].append(document)
        else:
            # Se o tipo de documento não estiver na lista ordenada, adiciona no final
            ordered_documents[tipo_documento] = [document]

    return render(request, 'transparencia.html', {'documentos': ordered_documents.items()})

def noticias(request):
    posts = Post.objects.all().order_by('-criado_em')
    destaques = posts[:3]
    outros = posts[3:]
    return render(request, 'noticias.html',{'noticias': posts, 'destaques': destaques, 'outros': outros})

def contato(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        telefone = request.POST.get('telefone')
        assunto = request.POST.get('assunto')
        mensagem = request.POST.get('mensagem')
        send_mail(
            'Mensagem de {}: {}'.format(name, assunto),
            'Nome: {} \nEmail: {} \nTelefone: {} \nAssunto: {} \nMensagem: {}'.format(name, email, telefone, assunto, mensagem),
            "ti@enjoysolucoes.med.br",
            ["contato@enjoysolucoes.med.br"],
            fail_silently=False,
        )
        messages.success(request, 'Formulário enviado com sucesso!')
        return redirect('contato')
    else:
        return render(request, 'contato.html')
    
def noticia(request, id):
    post = Post.objects.get(id=id)
    posts = Post.objects.filter(~Q(id=post.id)).order_by('-criado_em')
    sugestoes = posts[:3]
    current_url = request.build_absolute_uri()
    return render(request, 'noticia.html',{'post': post, 'sugestoes': sugestoes, 'current_url': current_url})
    