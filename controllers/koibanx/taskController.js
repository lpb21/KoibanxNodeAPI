const taskService = require('../../services/taskService');

const getTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        
        const response = await taskService.getTaskStatus(taskId);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: 'Error retrieving task status' });
    }
};

const getTaskErrors = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { page = 1, limit = 10 } = req.query;
      console.log(19,`📌 Consultando errores de la tarea: ${taskId}, Página: ${page}, Límite: ${limit}`);
      const errors = await taskService.getTaskErrors(taskId, Number(page), Number(limit));
      res.status(200).json(errors);
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving task errors' });
    }
  };

  module.exports = { getTaskStatus, getTaskErrors };