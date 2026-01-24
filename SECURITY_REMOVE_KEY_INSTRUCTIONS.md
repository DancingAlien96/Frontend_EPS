# Cómo remover la API key expuesta del historial Git

IMPORTANTE: Estos pasos reescriben la historia del repositorio y requieren un `force push`. Todos los colaboradores deberán volver a clonar o resetear sus clones.

Recomendación general:
1. Rota la API key en Firebase inmediatamente (console.firebase.google.com → Project settings → Web API Key).
2. Añade la nueva clave en tus secretos/variables de entorno (`NEXT_PUBLIC_FIREBASE_API_KEY`) y no la subas.

Opciones para limpiar la historia (elige una):

- Opción A — BFG (sencillo):

```bash
# Clona el repositorio como espejo
git clone --mirror https://github.com/<tuusuario>/Frontend_EPS.git
cd Frontend_EPS.git

# Crea un archivo `passwords.txt` que contenga la clave a eliminar (exacta)
echo "AIzaSyC-DPQ8W3nz2kRTAgi2SWzLpiihK9JwKQ4" > passwords.txt

# Ejecuta BFG para eliminar la clave
java -jar /path/to/bfg.jar --replace-text passwords.txt

# Limpia y fuerza push
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force
```

- Opción B — git-filter-repo (recomendado si está disponible):

```bash
# Instalar git-filter-repo y ejecutar desde un clon normal
git clone https://github.com/<tuusuario>/Frontend_EPS.git
cd Frontend_EPS

# Reemplazar la clave en todos los commits
git filter-repo --replace-text <(printf "%s=>%s\n" "AIzaSyC-DPQ8W3nz2kRTAgi2SWzLpiihK9JwKQ4" "REDACTED_FIREBASE_KEY")

# Forzar push
git push origin --force --all
git push origin --force --tags
```

Notas:
- Sustituye `AIzaSyC-...` por la clave exacta que GitHub marcó en la alerta.
- Después de forzar push, ve a GitHub y marca el secret alert como resuelto.
- Informa al equipo; cada colaborador debe reclonar (`git clone`) o resetear sus branches.

Si quieres, puedo intentar ejecutar la limpieza por ti desde aquí (hará `force push`). ¿Confirmas que proceda a reescribir la historia y forzar el push ahora? Si confirmas, ejecutaré la opción B si `git filter-repo` está disponible, o n la opción A con BFG si prefieres y Java está instalado.
