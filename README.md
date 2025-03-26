# Banda Caída Libre - Portafolio Web
Sitio Web de Banda Caída Libre https://bandacaidalibre.com

## Tecnologías Usadas

### Frontend:
- **HTML5**
- **CSS3**
- **JavaScript**

### Backend:
- **Python & FastAPI**
- **Jinja2**

## Instalación (Windows)
1. **Clonar el repositorio:**
```bash
git clone https://github.com/DeusCL/banda_caidalibre.git
cd banda_caidalibre
```
2. **Crear un entorno virtual con Python**
```bash
python -m venv .venv
.venv\Scripts\activate
```
3. **Instalar dependencias**
```bash
pip install -r requirements.txt
```
4. **Iniciar servidor de FastAPI**
```bash
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
5. **Abrir sitio web local en el navegador**
```bash
http://127.0.0.1:8000
```

