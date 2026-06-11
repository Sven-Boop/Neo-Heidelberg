// Proxy zur bestehenden Newsletter-Anmeldung (Elementor-Form im WordPress).
// Vermeidet CORS und liefert echte Erfolgs-/Fehlermeldungen an die Seite.
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, message: 'Ungültige Anfrage.' }, { status: 400 });
  }
  const { name, email, datenschutz, abmeldung } = body || {};
  if (!name || !email || !datenschutz || !abmeldung) {
    return Response.json({ ok: false, message: 'Bitte alle Felder ausfüllen.' }, { status: 400 });
  }

  const form = new URLSearchParams();
  form.set('action', 'elementor_pro_forms_send_form');
  form.set('post_id', '2634');
  form.set('form_id', '7bd89b3');
  form.set('referrer', 'https://www.neo-heidelberg.de/');
  form.set('form_fields[name]', String(name).slice(0, 200));
  form.set('form_fields[email]', String(email).slice(0, 200));
  form.set('form_fields[datenschutz]', 'on');
  form.set('form_fields[abmeldung]', 'on');

  try {
    const res = await fetch('https://www.neo-heidelberg.de/wp-admin/admin-ajax.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Referer: 'https://www.neo-heidelberg.de/',
      },
      body: form.toString(),
    });
    const data = await res.json().catch(() => null);
    if (data && data.success) {
      return Response.json({ ok: true });
    }
    const msg = data?.data?.message || 'Anmeldung gerade nicht möglich.';
    return Response.json({ ok: false, message: msg }, { status: 502 });
  } catch {
    return Response.json(
      { ok: false, message: 'Anmeldung gerade nicht möglich — bitte später erneut versuchen.' },
      { status: 502 }
    );
  }
}
