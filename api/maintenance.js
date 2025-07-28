import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  // Solo permitimos POST para cambiar estado
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // Verificamos contraseña (cambia "tuContrasena" por una segura)
  const { password, active } = req.body;
  if (password !== 'fearmc12345@') {
    return res.status(401).json({ error: 'Contraseña incorrecta' });
  }

  // Validamos active sea booleano
  if (typeof active !== 'boolean') {
    return res.status(400).json({ error: 'El estado active debe ser booleano' });
  }

  // Ruta absoluta a maintenance.json
  const filePath = path.join(process.cwd(), 'maintenance.json');

  try {
    // Guardamos el nuevo estado en maintenance.json
    fs.writeFileSync(filePath, JSON.stringify({ active }, null, 2));
    return res.status(200).json({ success: true, active });
  } catch (error) {
    console.error('Error escribiendo maintenance.json:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
