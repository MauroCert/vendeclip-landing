
import { useLocalizer } from "@/i18n/use-localizer";
import Link from "next/link";

import { LegalPage, type LegalSection } from "@/components/legal-page";

export const metadata = { title: "Terms | VendeClip",
  description: "Estas reglas explican cómo se puede usar VendeClip, qué responsabilidades tiene cada parte y cómo funcionan los contenidos, pagos, créditos e IA.",
};

const effectiveDate = "20 de julio de 2026";

const sections: LegalSection[] = [
  {
    title: "Aceptación de los Términos",
    body: (
      <p>
        Estos Términos de Servicio regulan el acceso y uso de VendeClip,
        incluyendo el sitio web, el panel de usuario, herramientas de creación
        de videos, funciones de inteligencia artificial, páginas públicas,
        analíticas, captación de leads, suscripciones, créditos y servicios
        relacionados. Al crear una cuenta, iniciar sesión, usar la plataforma o
        contratar un plan, aceptás estos Términos. Si usás VendeClip en nombre
        de una empresa, inmobiliaria, agencia o equipo, declarás que tenés
        autoridad para aceptar estos Términos por esa organización.
      </p>
    ),
  },
  {
    title: "Elegibilidad y uso profesional",
    body: (
      <p>
        VendeClip está diseñado para personas adultas, agentes, inmobiliarias,
        desarrolladores, equipos comerciales, marketers y profesionales que
        promocionan propiedades. Debés tener al menos 18 años y capacidad legal
        para contratar. Si usás la plataforma para una empresa o cliente, sos
        responsable de contar con autorización suficiente y de que todas las
        personas que accedan al workspace cumplan estos Términos.
      </p>
    ),
  },
  {
    title: "Descripción del servicio",
    body: (
      <p>
        VendeClip permite crear, editar, generar y publicar videos inmobiliarios
        a partir de fotos, videos, textos, marca, plantillas, voz, música,
        captions, avatares, clips generados con IA y páginas públicas de
        propiedades. El servicio puede incluir funciones automatizadas, beta o
        experimentales que evolucionan con el tiempo.
      </p>
    ),
  },
  {
    title: "Cuentas y seguridad",
    items: [
      "Debés proporcionar información verdadera, actualizada y completa al registrarte o configurar tu workspace.",
      "Sos responsable de mantener la confidencialidad de tus credenciales, sesiones, cuentas conectadas y dispositivos.",
      "Debés notificarnos si sospechás uso no autorizado, pérdida de acceso o vulneración de seguridad.",
      "Podemos rechazar, suspender o cerrar cuentas que incumplan estos Términos, afecten la seguridad o generen riesgo legal, técnico o reputacional.",
    ],
  },
  {
    title: "Uso permitido",
    body: (
      <p>
        Podés usar VendeClip para crear material comercial, promocional y
        operativo relacionado con propiedades, inmobiliarias, desarrollos,
        alquileres, compraventas, open houses, portfolios, anuncios y
        comunicación con potenciales interesados, siempre que cumplas la ley
        aplicable y estos Términos.
      </p>
    ),
  },
  {
    title: "Cumplimiento inmobiliario",
    body: (
      <p>
        Sos responsable de que todo material publicado cumpla las normas
        inmobiliarias, publicitarias, de protección al consumidor, privacidad,
        propiedad intelectual, competencia, vivienda justa, corretaje, licencias
        profesionales, permisos de propietario y reglas de plataformas sociales
        aplicables en tu jurisdicción. VendeClip no verifica la titularidad,
        precio, disponibilidad, ubicación, metraje, rentabilidad, amenities,
        estado legal ni condiciones comerciales de una propiedad.
      </p>
    ),
  },
  {
    title: "Contenido del usuario",
    items: [
      "Conservás los derechos que tengas sobre fotos, videos, textos, marcas, logos, datos de propiedades, scripts, música, instrucciones y demás contenido que subas o ingreses.",
      "Nos otorgás una licencia mundial, no exclusiva, sublicenciable y libre de regalías para alojar, procesar, adaptar, renderizar, transmitir, mostrar y usar tu contenido únicamente para operar, mejorar, proteger y prestar VendeClip.",
      "Declarás que tenés todos los derechos y permisos necesarios sobre el contenido que subís, incluyendo autorizaciones de propietarios, inmobiliarias, fotógrafos, videógrafos, modelos, titulares de marca, música, planos y ubicaciones.",
      "Sos responsable de revisar la exactitud legal, comercial y técnica de los videos, textos, precios, superficies, ubicaciones, amenities, disponibilidad, condiciones de venta o alquiler y cualquier afirmación publicada.",
      "Podemos remover contenido o limitar publicaciones si creemos razonablemente que infringen derechos, leyes, políticas de terceros o estos Términos.",
    ],
  },
  {
    title: "Contenido generado con IA",
    items: [
      "Las funciones de IA pueden producir resultados inexactos, incompletos, similares a otros contenidos o no adecuados para un uso específico.",
      "Debés revisar todo resultado antes de publicarlo, incluyendo videos, clips, captions, voz, avatar, scripts, traducciones, claims comerciales y datos de propiedad.",
      "No garantizamos que el contenido generado sea único, libre de errores, apto para una campaña concreta o conforme a normas inmobiliarias, publicitarias o de propiedad intelectual de tu jurisdicción.",
      "Podemos aplicar límites técnicos, de calidad, seguridad, moderación o disponibilidad sobre funciones de IA.",
    ],
  },
  {
    title: "Voz, avatar, música y derechos de imagen",
    body: (
      <p>
        Si usás funciones de voz, avatar, música, locución, imágenes de personas
        o materiales de marca, declarás que tenés los permisos necesarios para
        crear, editar, publicar y distribuir esos resultados. No podés usar
        VendeClip para suplantar personas, crear aprobaciones falsas, usar voces
        o apariencias sin autorización, ni inducir a error sobre quién aparece,
        habla, promociona o respalda una propiedad.
      </p>
    ),
  },
  {
    title: "Publicaciones, páginas públicas y leads",
    body: (
      <p>
        Si activás una página pública, compartís un enlace o publicás un video
        generado con VendeClip, sos responsable del contenido mostrado y de
        cumplir normas aplicables sobre publicidad inmobiliaria, protección al
        consumidor, privacidad, datos de contacto, consentimiento de leads,
        disponibilidad de propiedades y veracidad de la información. Los
        formularios de leads son una herramienta de captura y organización; no
        garantizamos ventas, reservas, visitas, consultas calificadas ni
        resultados comerciales.
      </p>
    ),
  },
  {
    title: "Planes, créditos y pagos",
    items: [
      "Al contratar un plan, aceptás pagar los importes, impuestos y cargos aplicables mostrados al momento de la compra.",
      "Los pagos pueden procesarse mediante proveedores externos. El uso de esos proveedores puede estar sujeto a sus propios términos y políticas.",
      "Los créditos, límites de uso, renders, generaciones, clips de IA, almacenamiento u otras unidades de consumo pueden variar por plan y actualizarse con aviso razonable.",
      "Salvo que se indique expresamente lo contrario o lo exija la ley aplicable, pagos, créditos consumidos, renders completados y generaciones ejecutadas no son reembolsables.",
      "Podemos suspender funciones pagas, generación o acceso si un pago falla, una suscripción vence, hay disputa de cargo, fraude sospechado o incumplimiento de estos Términos.",
    ],
  },
  {
    title: "Renders, generaciones y almacenamiento",
    body: (
      <p>
        Las generaciones, renders, clips, mejoras de imágenes, voces, avatares,
        captions y demás procesos pueden consumir créditos o límites aunque el
        resultado requiera revisión, edición o regeneración. Podemos establecer
        límites de tamaño, duración, resolución, cantidad de proyectos,
        almacenamiento, retención de archivos, cola de procesamiento y prioridad
        según el plan contratado.
      </p>
    ),
  },
  {
    title: "Pruebas, funciones beta y disponibilidad",
    body: (
      <p>
        Algunas funciones pueden estar en beta, ser experimentales o depender de
        proveedores externos. Podemos modificar, pausar, limitar o retirar
        funciones, plantillas, voces, modelos, proveedores, integraciones,
        límites, precios o flujos de producto. Hacemos esfuerzos razonables para
        mantener el servicio disponible, pero no garantizamos funcionamiento
        ininterrumpido, libre de errores o compatible con todos los
        dispositivos, redes, navegadores o plataformas sociales.
      </p>
    ),
  },
  {
    title: "Uso prohibido",
    items: [
      "Usar VendeClip para contenido ilegal, engañoso, discriminatorio, difamatorio, fraudulento, invasivo de privacidad o que infrinja derechos de terceros.",
      "Subir contenido sin permisos suficientes o que incluya personas, marcas, música, propiedades, planos o datos personales sin autorización.",
      "Publicar información falsa o engañosa sobre precios, disponibilidad, ubicación, metraje, condiciones, titularidad, financiamiento, rentabilidad o características de una propiedad.",
      "Intentar vulnerar seguridad, extraer datos, abusar de APIs, eludir límites de plan, interferir con la infraestructura o usar automatizaciones no autorizadas.",
      "Revender, copiar, modificar o explotar partes sustanciales de la plataforma sin autorización escrita.",
      "Usar resultados de IA para suplantar personas, crear deepfakes engañosos, manipular testimonios o inducir a error sobre una propiedad o transacción.",
      "Usar VendeClip para captar, vender, transferir o usar datos personales sin aviso, consentimiento o base legal suficiente.",
    ],
  },
  {
    title: "Propiedad intelectual de VendeClip",
    body: (
      <p>
        VendeClip, su marca, interfaz, código, diseño, plantillas, flujos,
        software, documentación, modelos de composición, elementos visuales y
        demás materiales propios pertenecen a VendeClip o sus licenciantes.
        Estos Términos no te transfieren propiedad sobre la plataforma. Te
        otorgamos una licencia limitada, revocable, no exclusiva e
        intransferible para usar el servicio conforme a tu plan y estos
        Términos.
      </p>
    ),
  },
  {
    title: "Servicios de terceros",
    body: (
      <p>
        VendeClip puede integrarse o depender de servicios externos, como
        autenticación, pagos, almacenamiento, hosting, generación de IA, voz,
        avatar, video, email, analíticas, redes sociales o mensajería. No
        controlamos todos los aspectos de esos servicios y no somos responsables
        por sus interrupciones, cambios, errores, políticas, revisiones,
        rechazos de publicación o decisiones de plataforma.
      </p>
    ),
  },
  {
    title: "Privacidad",
    body: (
      <p>
        El tratamiento de información personal se describe en nuestra{" "}
        <Link
          className="font-semibold text-vc-teal hover:underline"
          href="/privacy"
        >
          Política de Privacidad
        </Link>
        . Esa Política es un aviso sobre nuestras prácticas y no convierte en
        obligatorio ningún tratamiento opcional. Cuando corresponda,
        solicitaremos una elección separada para cookies, analíticas y
        grabaciones de sesión.
      </p>
    ),
  },
  {
    title: "Usuarios y consumidores de Estados Unidos y Canadá",
    items: [
      "Nada en estos Términos limita derechos irrenunciables que te correspondan bajo leyes de protección al consumidor, privacidad, accesibilidad, reembolsos o suscripciones de tu estado, provincia o territorio.",
      "Los precios pueden mostrarse en dólares estadounidenses u otra moneda indicada al pagar. Sos responsable de impuestos aplicables, salvo aquellos que debamos recaudar y remitir por ley.",
      "Si una renovación automática o suscripción está disponible, mostraremos antes de la compra el precio, la frecuencia y cómo cancelar. Podés cancelar futuras renovaciones mediante las opciones disponibles en la cuenta o contactándonos, sin perjuicio de derechos locales adicionales.",
      "Debés usar el servicio de acuerdo con controles de exportación, sanciones económicas y demás leyes comerciales aplicables en Estados Unidos, Canadá y tu jurisdicción.",
    ],
  },
  {
    title: "Comunicaciones electrónicas",
    body: (
      <p>
        Aceptás recibir electrónicamente avisos operativos, recibos,
        actualizaciones contractuales y comunicaciones relacionadas con tu
        cuenta. Podés conservar una copia de estos Términos. Las comunicaciones
        promocionales son opcionales y podés cancelarlas mediante el enlace
        incluido en el mensaje o escribiéndonos; seguiremos enviando
        comunicaciones necesarias para la cuenta.
      </p>
    ),
  },
  {
    title: "Cancelación y terminación",
    items: [
      "Podés dejar de usar VendeClip o cancelar tu plan según las opciones disponibles en la plataforma o contactándonos.",
      "Podemos suspender o terminar acceso si incumplís estos Términos, infringís derechos, generás riesgo legal o técnico, no pagás cargos aplicables o abusás del servicio.",
      "Tras la terminación, podés perder acceso a proyectos, renders, páginas públicas, leads, créditos no utilizados y funciones del plan, salvo que la ley aplicable exija lo contrario.",
      "Ciertas secciones seguirán vigentes después de la terminación, incluyendo propiedad intelectual, pagos pendientes, limitaciones de responsabilidad, indemnidad y resolución de disputas.",
    ],
  },
  {
    title: "Cambios del servicio",
    body: (
      <p>
        Podemos mejorar, modificar, reemplazar o retirar funciones, plantillas,
        modelos, voces, estilos, integraciones, flujos, planes, límites y
        precios. Si un cambio material afecta una suscripción paga activa,
        haremos esfuerzos razonables para comunicarlo con antelación cuando sea
        práctico.
      </p>
    ),
  },
  {
    title: "Exclusión de garantías",
    body: (
      <p>
        VendeClip se proporciona tal cual y según disponibilidad. En la máxima
        medida permitida por la ley, no ofrecemos garantías de comerciabilidad,
        idoneidad para un fin particular, ausencia de errores, disponibilidad,
        resultados comerciales, rendimiento de anuncios, generación de leads,
        ventas, cumplimiento normativo de campañas o aceptación por plataformas
        sociales.
      </p>
    ),
  },
  {
    title: "Limitación de responsabilidad",
    body: (
      <p>
        En la máxima medida permitida por la ley, VendeClip no será responsable
        por daños indirectos, incidentales, especiales, consecuentes, punitivos,
        pérdida de ganancias, pérdida de datos, interrupción de negocio, pérdida
        de oportunidades, decisiones comerciales, reclamos de terceros o
        resultados derivados de contenido publicado. Nuestra responsabilidad
        total por cualquier reclamo relacionado con el servicio se limitará al
        importe pagado por vos a VendeClip durante los tres meses anteriores al
        evento que originó el reclamo, o cien dólares estadounidenses, lo que
        sea mayor.
      </p>
    ),
  },
  {
    title: "Indemnidad",
    body: (
      <p>
        Aceptás defender, indemnizar y mantener indemne a VendeClip, sus
        afiliadas, directores, empleados, proveedores y representantes frente a
        reclamos, daños, pérdidas, responsabilidades, costos y gastos derivados
        de tu contenido, tus publicaciones, tus leads, tu uso del servicio, tu
        incumplimiento de estos Términos o tu infracción de leyes o derechos de
        terceros.
      </p>
    ),
  },
  {
    title: "Ley aplicable y disputas",
    body: (
      <p>
        Salvo que una norma obligatoria disponga otra cosa, estos Términos se
        regirán por las leyes de México, sin considerar sus principios de
        conflicto de leyes. Antes de iniciar una disputa formal, ambas partes
        intentarán resolver el problema de buena fe escribiendo a
        hola@vendeclip.com y dando un plazo razonable para responder. Cuando la
        ley lo permita, las partes aceptan la jurisdicción de los tribunales
        competentes de Ciudad de México para disputas relacionadas con estos
        Términos. Esta elección no priva a consumidores de Estados Unidos o
        Canadá de protecciones obligatorias ni de foros que no puedan
        renunciarse por contrato.
      </p>
    ),
  },
  {
    title: "Cambios a los Términos",
    body: (
      <p>
        Podemos actualizar estos Términos cuando cambien el producto, los
        proveedores, requisitos legales o condiciones comerciales. Si los
        cambios son materiales, haremos esfuerzos razonables para avisarte. El
        uso continuado de VendeClip después de la entrada en vigencia de cambios
        implica aceptación de la versión actualizada.
      </p>
    ),
  },
  {
    title: "Contacto",
    body: (
      <p>
        Para preguntas sobre estos Términos, pagos, cuenta o solicitudes
        legales, escribinos a{" "}
        <a
          className="font-semibold text-vc-teal hover:underline"
          href="mailto:hola@vendeclip.com"
        >
          hola@vendeclip.com
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  const localize = useLocalizer();
  return localize((
    <LegalPage
      eyebrow="Términos"
      title="Términos de Servicio"
      description="Estas reglas explican cómo se puede usar VendeClip, qué responsabilidades tiene cada parte y cómo funcionan los contenidos, pagos, créditos e IA."
      effectiveDate={effectiveDate}
      documentNotice="Estos Términos son el acuerdo principal para usar VendeClip. Si contratás un plan, activás funciones pagas, publicás páginas o recopilás leads, también pueden aplicar condiciones adicionales mostradas en el producto o por proveedores de pago y publicación."
      sections={sections}
    />
  ));
}
