const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
    const eventos = await Evento.find().populate('user', 'name _id');
    return res.status(200).json({
        ok: true,
        events: eventos
    });
}

const crearEvento = async (req, res = response) => {
    const { title, notes, start, end, bgColor, user } = req.body;
    try {
        const evento = new Evento(req.body);
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        res.status(200).json({
            ok: true,
            event: eventoGuardado
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Se produjo un error al crear un nuevo evento'
        });
    }

}

const actualizarEvento = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid
    if (!eventId) {
        return res.status(500).json({
            ok: false,
            msg: 'Falta identificador'
        });
    }
    try {
        const evento = await Evento.findById(eventId);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'No se encontró el evento con ese id'
            });
        }

        if (uid !== String(evento.user)) {
            return res.status(401).json({
                ok: false,
                msg: 'Error al actualizar un evento ajeno',
            });
        }

        const nuevoEvento = { ...req.body, user: uid }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventId, nuevoEvento, { new: true })

        return res.status(200).json({
            ok: true,
            event: eventoActualizado
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Ocurrió un error'
        });
    }
}

const borrarEvento = async (req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid

    if (!eventId) {
        return res.status(500).json({
            ok: false,
            msg: 'Falta identificador'
        });
    }

    try {
        const evento = await Evento.findById(eventId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado'
            });
        }
        if (uid !== String(evento.user)) {
            return res.status(401).json({
                ok: false,
                msg: 'Error al eliminar un evento ajeno',
            });
        }
        await Evento.findByIdAndDelete(eventId)
        return res.status(200).json({
            ok: true,
            event: evento
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error'
        });
    }

    return res.status(200).json({
        ok: true,
        msg: 'Borrar Evento'
    });
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento
}