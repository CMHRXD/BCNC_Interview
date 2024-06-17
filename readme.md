####Descripción General

El proyecto consiste en la integración de tres componentes principales: api-sistemas-A, api-sistemas-B, y api-manager. El proceso de integración implica la obtención de facturas desde api-sistemas-A y su envío a api-sistemas-B utilizando api-manager.

---

####API-sistemas-A

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

####API-sistemas-B

POST /bills: Crea una nueva factura en el sistema.

    Parámetros del cuerpo:
        invoice_id: ID de la factura.
        customer: Cliente de la factura.
        amount_due: Monto adeudado.
        date_issued: Fecha de emisión de la factura.
        status: Estado de la factura (paid/unpaid).

---

####API-manager

GET /integrate: Inicia el proceso de integración de facturas.

    Parámetros de consulta:
        start_date: Fecha de inicio para el rango de consulta (Formato: YYYY-MM-DD).
        end_date: Fecha de fin para el rango de consulta (Formato: YYYY-MM-DD).

---

####Justificación del Diseño

Múltiples Métodos de Consulta: Se utilizan diferentes métodos de consulta (GET, POST) para permitir la realización de diversas operaciones sobre los recursos de facturas.

Operaciones RESTful: Se sigue el principio de diseño RESTful para definir las operaciones de manera que sean intuitivas y sigan las convenciones del protocolo HTTP.

Parámetros de Consulta: Para la integración se utilizan parámetros de consulta (query parameters) en lugar de path parameters, ya que los filtros son opcionales y no están directamente relacionados con la identificación de recursos.

API Intermediaria: La api-manager actúa como intermediaria para manejar la autenticación, transformación de datos y reenvío entre api-sistemas-A y api-sistemas-B, mejorando la seguridad y mantenibilidad del sistema.