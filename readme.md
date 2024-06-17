#### Descripción General

El proyecto consiste en la integración de tres componentes principales: api-sistemas-A, api-sistemas-B, y api-manager. El proceso de integración implica la obtención de facturas desde api-sistemas-A y su envío a api-sistemas-B utilizando api-manager.

---

#### API-sistemas-A

GET /facturas: Obtiene todas las facturas en un rango de fechas.

    Parámetros de consulta:
        fecha_inicio: Fecha de inicio para el rango de consulta (Formato: YYYY-MM-DD).
        fecha_fin: Fecha de fin para el rango de consulta (Formato: YYYY-MM-DD).

POST /auth/token: Obtiene un token de autenticación OAuth 2.0.

    Parámetros del cuerpo:
        grant_type: Tipo de concesión (client_credentials).
        client_id: ID del cliente.
        client_secret: Secreto del cliente.

---

#### API-sistemas-B

POST /bills: Crea una nueva factura en el sistema.

    Parámetros del cuerpo:
        invoice_id: ID de la factura.
        customer: Cliente de la factura.
        amount_due: Monto adeudado.
        date_issued: Fecha de emisión de la factura.
        status: Estado de la factura (paid/unpaid).

---

#### API-manager

GET /integrate: Inicia el proceso de integración de facturas.

    Parámetros de consulta:
        fecha_inicio: Fecha de inicio para el rango de consulta (Formato: YYYY-MM-DD).
        fecha_fin: Fecha de fin para el rango de consulta (Formato: YYYY-MM-DD).

---

#### Justificación del Diseño

Múltiples Métodos de Consulta: Se utilizan diferentes métodos de consulta (GET, POST) para permitir la realización de diversas operaciones sobre los recursos de facturas.

Operaciones RESTful: Se sigue el principio de diseño RESTful para definir las operaciones de manera que sean intuitivas y sigan las convenciones del protocolo HTTP.

Parámetros de Consulta: Para la integración se utilizan parámetros de consulta (query parameters) en lugar de path parameters, ya que los filtros son opcionales y no están directamente relacionados con la identificación de recursos.

API Intermediaria: La api-manager actúa como intermediaria para manejar la autenticación, transformación de datos y reenvío entre api-sistemas-A y api-sistemas-B, mejorando la seguridad y mantenibilidad del sistema.



### Guia de uso
Clonar el Repositorio:
    bash git clone https://github.com/CMHRXD/BCNC_Interview.git
    cd BCNC_Interview

##### Configurar el Entorno:

    Crear archivos .env.dev o .env.prod y configurar las variables de entorno necesarias.

##### Instalar Dependencias:

    npm install

##### Ejecutar los Servidores:

    Navegar a los directorios de api-sistemas-A, api-sistemas-B, y api-manager y ejecutar:
    npm run dev-server

Probar la Integración:
        Intrucciones
            1-Importar las colecciones de Postman para probar las APIs:
                BCNC_Tecnical_enterview.postman_collection.json: Contiene las solicitudes API.
                BCNC_Tecnical_enterview_env.postman_collection.json: Contiene las variables de entorno para las solicitudes.
            2-Hacer Get request al endpoint Integrate Apis para realizar el proceso de integracion.
            
            
Notas

    Variables de Entorno: Asegúrese de configurar correctamente las variables de entorno (PORT, configuraciones de base de datos, claves de API) en los archivos .env.
    
    Logs y Monitoreo: Implementar herramientas de logging como Winston o Morgan para registrar y monitorear la actividad del servidor.
    
    Seguridad: Manejar tokens y claves de API de manera segura, sin exponerlas en clientes.
