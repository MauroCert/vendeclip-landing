
import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata = { title: "Privacy | VendeClip" };

const effectiveDate = "20 de julio de 2026";

const sections: LegalSection[] = [
  {
    title: "Alcance y responsable",
    body: (
      <p>
        Esta Política de Privacidad explica cómo VendeClip recopila, utiliza,
        conserva, protege y comparte información personal cuando visitás nuestro
        sitio, creás una cuenta, configurás un workspace, subís contenido de
        propiedades, generás videos con IA, publicás páginas compartibles,
        capturás leads o usás cualquier servicio relacionado. VendeClip actúa
        como responsable del tratamiento respecto de los datos necesarios para
        operar la plataforma y, en algunos casos, como proveedor o encargado
        respecto de datos que cargás para tus propios fines comerciales.
      </p>
    ),
  },
  {
    title: "Información que recopilamos",
    items: [
      "Información de cuenta, como nombre, correo electrónico, contraseña cifrada, imagen de perfil, método de autenticación y estado de verificación de correo.",
      "Información de workspace o inmobiliaria, como nombre comercial, datos de contacto, marca, logo, colores, sitio web, WhatsApp y preferencias de publicación.",
      "Contenido que subís o generás, incluyendo fotos, videos, clips, textos de propiedades, direcciones o ubicaciones aproximadas, scripts de voz, instrucciones de generación, logos, música, captions y resultados generados con IA.",
      "Información de leads capturados en páginas públicas, como nombre, correo, teléfono, mensaje, propiedad de interés, fecha, fuente y estado de seguimiento.",
      "Información de uso y rendimiento, como proyectos creados, plantillas seleccionadas, reproducciones, clics, eventos de conversión, errores, estado de jobs y actividad dentro del producto.",
      "Información técnica, como dirección IP, navegador, sistema operativo, identificadores de sesión, cookies, registros de seguridad, páginas visitadas y fecha/hora de acceso.",
      "Información de pagos y facturación procesada por proveedores externos. VendeClip no almacena números completos de tarjeta; recibimos datos limitados como plan, estado de suscripción, identificadores de cliente, importes, moneda y recibos.",
      "Comunicaciones con soporte, ventas o administración, incluyendo mensajes, solicitudes, archivos adjuntos y notas necesarias para responderte.",
    ],
  },
  {
    title: "Fuentes de la información",
    items: [
      "Directamente de vos, cuando creás una cuenta, configurás un workspace, contratás un plan, subís contenido, completás un formulario o nos contactás.",
      "Automáticamente desde tu navegador o dispositivo, mediante registros técnicos, cookies necesarias y, solo cuando corresponda y lo aceptás, analíticas opcionales.",
      "De integrantes autorizados de tu workspace, proveedores que procesan pagos o autenticación, y servicios que conectás o decidís utilizar con VendeClip.",
      "De visitantes de páginas públicas que envían formularios de lead o interactúan con contenido publicado por un usuario de VendeClip.",
    ],
  },
  {
    title: "Cómo usamos la información",
    items: [
      "Prestar, mantener y mejorar VendeClip, incluyendo la creación de proyectos, generación de clips, renders, páginas públicas, captions, voz, avatar, analíticas y gestión de leads.",
      "Autenticar usuarios, proteger cuentas, prevenir abuso, investigar errores y mantener la seguridad de la plataforma.",
      "Procesar pagos, administrar suscripciones, créditos, facturación, límites de uso y soporte relacionado con el plan contratado.",
      "Personalizar la experiencia, recordar preferencias, sugerir plantillas, música, estilos y ajustes de generación.",
      "Enviar comunicaciones operativas, como verificación de correo, recuperación de contraseña, estado de renders, cambios importantes del servicio y respuestas de soporte.",
      "Analizar el uso agregado de la plataforma para mejorar rendimiento, experiencia de usuario, calidad de generación y estabilidad.",
      "Cumplir obligaciones legales, responder solicitudes válidas de autoridades, hacer cumplir nuestros términos y proteger derechos de VendeClip, usuarios o terceros.",
    ],
  },
  {
    title: "Bases legales y consentimiento",
    body: (
      <p>
        Según la ley aplicable, procesamos información porque es necesario para
        prestar el servicio contratado, porque tenemos intereses legítimos
        razonables, porque debemos cumplir obligaciones legales, porque nos
        diste consentimiento o porque necesitás que tomemos medidas
        precontractuales. Podés retirar consentimientos no esenciales cuando
        corresponda, aunque eso no afecta tratamientos realizados previamente ni
        procesos necesarios para operar la plataforma.
      </p>
    ),
  },
  {
    title: "Contenido de propiedades y permisos",
    body: (
      <p>
        Cuando subís fotos, videos, logos, textos o datos de una propiedad,
        seguís siendo responsable de contar con los derechos, permisos y
        autorizaciones necesarios para usar ese contenido. Esto incluye permisos
        sobre imágenes de inmuebles, marcas, personas, música, datos de
        contacto, ubicaciones, planos y cualquier información que publiques o
        compartas mediante VendeClip.
      </p>
    ),
  },
  {
    title: "IA y procesamiento de contenido",
    body: (
      <p>
        Algunas funciones procesan fotos, videos, prompts, scripts, voz, música,
        logos, datos de marca y metadatos para generar o editar resultados
        mediante modelos de inteligencia artificial. Podemos enviar a
        proveedores externos únicamente la información necesaria para ejecutar
        la acción solicitada, como mejorar una imagen, generar clips, sintetizar
        voz, crear captions, renderizar un video, alojar archivos o procesar una
        suscripción. No presentamos al usuario nombres de proveedores internos
        salvo que sea legalmente necesario o útil para explicar una integración.
      </p>
    ),
  },
  {
    title: "Cómo compartimos información",
    items: [
      "Con proveedores de servicios que operan la plataforma, incluyendo hosting, base de datos, almacenamiento, CDN, autenticación, email, pagos, IA, render de video, analíticas y soporte.",
      "Con integrantes autorizados de tu workspace, cuando la funcionalidad de cuenta o equipo lo permita.",
      "Con visitantes de tus páginas públicas, únicamente respecto del contenido que decidís publicar o compartir, como videos, textos de propiedad, datos de contacto y formularios de lead.",
      "Con autoridades, asesores o terceros cuando sea necesario para cumplir la ley, responder procesos legales, prevenir fraude, proteger seguridad o defender derechos.",
      "En una operación corporativa, como fusión, adquisición, financiamiento, reorganización o venta de activos, siempre sujeto a protecciones razonables de confidencialidad.",
      "No vendemos información personal ni la compartimos para publicidad comportamental entre contextos. Tampoco recibimos dinero a cambio de información personal. Si esta práctica cambia, actualizaremos este aviso y ofreceremos los mecanismos de exclusión exigidos por ley antes de hacerlo.",
    ],
  },
  {
    title: "Páginas públicas y leads",
    body: (
      <p>
        Si publicás una página de propiedad o compartís un enlace generado por
        VendeClip, parte del contenido que configuraste puede quedar visible
        para visitantes, incluyendo videos, imágenes, descripción, datos de
        contacto, llamadas a la acción y formularios. Los datos de leads que
        recibís a través de esas páginas deben usarse conforme a las leyes
        aplicables de privacidad, marketing, consentimiento y protección al
        consumidor.
      </p>
    ),
  },
  {
    title: "Cookies y tecnologías similares",
    body: (
      <p>
        Usamos cookies necesarias para autenticar sesiones, proteger la
        plataforma, recordar idioma, conservar tu elección de privacidad y
        guardar únicamente si tu solicitud proviene de Estados Unidos o Canadá.
        Para visitantes detectados en esos países, PostHog permanece desactivado
        hasta que acepten las cookies opcionales. Rechazarlas no impide usar las
        funciones esenciales.
      </p>
    ),
    items: [
      "Cookies necesarias: sesión y seguridad, preferencia de idioma, elección de cookies y una categoría geográfica limitada (Estados Unidos/Canadá u otros países). No se usan para publicidad.",
      "PostHog (opcional): si aceptás, puede guardar un identificador, identificadores de dispositivo y sesión, flags activos y propiedades de uso en cookies y almacenamiento local. Configuramos sus cookies con una vigencia máxima de 180 días.",
      "Analíticas y replay (opcional): PostHog puede registrar páginas visitadas, clics, navegación, tipo de dispositivo, errores y una reproducción de la interacción con la interfaz. Las entradas de formularios se enmascaran en las grabaciones.",
      "Podés aceptar, rechazar o cambiar tu elección en cualquier momento desde “Configurar cookies”. También respetamos Global Privacy Control para visitantes de Estados Unidos y Canadá como una señal de rechazo de tecnologías opcionales.",
    ],
  },
  {
    title: "Datos sensibles",
    body: (
      <p>
        VendeClip no está diseñado para recopilar datos personales sensibles. No
        subas ni solicites información médica, biométrica, financiera
        confidencial, de menores, ni otra información sensible salvo que tengas
        una base legal válida y sea estrictamente necesaria para tu uso
        permitido del servicio.
      </p>
    ),
  },
  {
    title: "Retención de datos",
    body: (
      <p>
        Conservamos información durante el tiempo necesario para prestar el
        servicio, mantener registros comerciales razonables, cumplir
        obligaciones legales, resolver disputas, prevenir abuso y hacer cumplir
        nuestros acuerdos. Cuando eliminás contenido o cerrás una cuenta,
        podemos conservar copias por un período limitado en respaldos, logs,
        registros antifraude, facturación o archivos exigidos por ley.
      </p>
    ),
  },
  {
    title: "Seguridad",
    body: (
      <p>
        Aplicamos medidas administrativas, técnicas y organizativas razonables
        para proteger información, como cifrado de contraseñas, controles de
        acceso, proveedores especializados, monitoreo de errores y prácticas de
        minimización. Ningún sistema conectado a internet es completamente
        seguro, por lo que no podemos garantizar seguridad absoluta.
      </p>
    ),
  },
  {
    title: "Tus opciones y derechos",
    items: [
      "Podés acceder, corregir o actualizar cierta información desde la configuración de tu cuenta.",
      "Podés solicitar eliminación, exportación, corrección o restricción de uso de datos escribiendo a hola@vendeclip.com.",
      "Podés cancelar comunicaciones no esenciales siguiendo las instrucciones incluidas en el mensaje o contactándonos.",
      "Según tu ubicación, podrías tener derechos adicionales bajo leyes de privacidad aplicables, incluyendo acceso, rectificación, cancelación, oposición, portabilidad, eliminación, limitación del tratamiento o no venta/compartición de datos.",
      "No discriminaremos a usuarios por ejercer derechos de privacidad reconocidos por la ley aplicable.",
      "Podemos verificar razonablemente tu identidad antes de responder y, cuando la ley lo permita, rechazar solicitudes manifiestamente infundadas, excesivas o sujetas a una excepción legal. Te explicaremos la decisión y los mecanismos de apelación disponibles.",
    ],
  },
  {
    title: "Solicitudes de eliminación",
    body: (
      <p>
        Podés pedir la eliminación de tu cuenta o de contenido específico.
        Algunas copias pueden permanecer temporalmente en respaldos, registros
        de seguridad, facturación, prevención de fraude, cumplimiento legal o
        archivos necesarios para resolver disputas. Si eliminás contenido
        publicado, es posible que enlaces, vistas previas o copias previamente
        compartidas por terceros no desaparezcan de inmediato.
      </p>
    ),
  },
  {
    title: "Transferencias internacionales",
    body: (
      <p>
        VendeClip y sus proveedores pueden procesar información en distintos
        países. Al usar el servicio, entendés que tu información puede
        transferirse y procesarse fuera de tu jurisdicción, donde las leyes de
        protección de datos pueden diferir. Implementamos medidas razonables
        para proteger la información cuando se transfiere.
      </p>
    ),
  },
  {
    title: "Menores de edad",
    body: (
      <p>
        VendeClip está dirigido a profesionales, inmobiliarias, equipos
        comerciales y personas adultas. No está diseñado para menores de 18
        años. Si creemos que recopilamos información de un menor sin
        autorización, tomaremos medidas razonables para eliminarla.
      </p>
    ),
  },
  {
    title: "Aviso para residentes de Estados Unidos",
    body: (
      <p>
        Durante los últimos doce meses podemos haber recopilado y divulgado,
        para fines comerciales, identificadores; información comercial y de
        cuenta; actividad de internet o de la aplicación; datos de
        geolocalización aproximada derivados de IP; contenido audiovisual;
        comunicaciones; e inferencias limitadas sobre preferencias de producto.
        Las finalidades, fuentes y categorías de destinatarios se describen
        arriba. No vendemos ni compartimos información personal para publicidad
        comportamental entre contextos y no tenemos conocimiento real de haber
        vendido o compartido con ese fin información de menores de 16 años.
      </p>
    ),
    items: [
      "Cuando una ley estatal aplicable lo reconozca, podés solicitar acceso o conocimiento, corrección, eliminación y una copia portable de tu información, y excluirte de venta, publicidad dirigida o ciertos perfiles con efectos legales significativos.",
      "Podés ejercer estos derechos escribiendo a hola@vendeclip.com. También puede hacerlo un agente autorizado; podremos pedir prueba de autorización y verificar tu identidad directamente.",
      "Si rechazamos una solicitud, podés apelar respondiendo al mismo correo con el asunto “Apelación de privacidad”. No te discriminaremos por ejercer un derecho aplicable.",
      "Procesamos señales Global Privacy Control como rechazo de analíticas opcionales en este sitio. Como no vendemos ni compartimos datos para publicidad comportamental, no ofrecemos un flujo separado de “No vender o compartir”.",
      "Estas disposiciones se aplican únicamente cuando VendeClip y el tratamiento alcanzan los umbrales y requisitos de la ley estatal correspondiente.",
    ],
  },
  {
    title: "Aviso para personas en Canadá",
    body: (
      <p>
        Cuando PIPEDA o una ley provincial sustancialmente similar aplique,
        identificamos las finalidades antes o al momento de recopilar
        información, limitamos la recopilación, el uso, la divulgación y la
        retención, utilizamos salvaguardas proporcionales y obtenemos
        consentimiento significativo cuando corresponde. Podés retirar el
        consentimiento para usos opcionales sin afectar el tratamiento previo ni
        los datos necesarios para prestar el servicio o cumplir la ley.
      </p>
    ),
    items: [
      "Podés solicitar acceso a la información personal que conservamos sobre vos, conocer cómo se usa y a quién se divulgó, y pedir que se corrija información inexacta o incompleta.",
      "Para una solicitud o reclamo, escribí a nuestro responsable de privacidad en hola@vendeclip.com. Procuraremos responder dentro de los plazos legales aplicables.",
      "También podés presentar una queja ante la Office of the Privacy Commissioner of Canada o la autoridad provincial competente, según corresponda.",
      "Nuestros proveedores pueden procesar información fuera de Canadá, incluyendo Estados Unidos, donde puede quedar sujeta a las leyes y solicitudes lícitas de esas jurisdicciones.",
    ],
  },
  {
    title: "Cambios a esta Política",
    body: (
      <p>
        Podemos actualizar esta Política para reflejar cambios legales, técnicos
        o comerciales. Si los cambios son materiales, haremos esfuerzos
        razonables para notificarte mediante la plataforma, correo electrónico o
        un aviso visible. La versión vigente estará disponible en esta página.
      </p>
    ),
  },
  {
    title: "Relación con los Términos",
    body: (
      <p>
        Esta Política forma parte de nuestra relación contigo y se complementa
        con los{" "}
        <Link
          className="font-semibold text-vc-teal hover:underline"
          href="/terms"
        >
          Términos de Servicio
        </Link>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  const localize = useLocalizer();
  return localize((
    <LegalPage
      eyebrow="Privacidad"
      title="Política de Privacidad"
      description="Explicamos qué información maneja VendeClip, para qué la usamos y qué opciones tenés sobre tus datos."
      effectiveDate={effectiveDate}
      documentNotice="Este aviso funciona también como aviso de recopilación para residentes de Estados Unidos y Canadá. Se aplica junto con nuestros Términos de Servicio y cualquier aviso específico mostrado dentro del producto. Si usás VendeClip para recopilar datos de leads o publicar contenido de terceros, también sos responsable de cumplir las leyes y permisos que apliquen a tu actividad inmobiliaria."
      sections={sections}
    />
  ));
}
