const pg = require("../utils/connect");

exports.addEmployee = async function addEmployee(req, res) {
  try {
    const { name, division, salary, address } = req.body;

    const existingEmployee = await pg.query(
      "SELECT * FROM employee WHERE name = $1",
      [name]
    );

    if (existingEmployee.rows.length > 0) {
      return res.status(409).json({ error: "An employee with this name already exists" });
    }

    const response = await pg.query(
      "INSERT INTO employee (name, division, salary, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, division, salary, address]
    );

    res.status(201).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getEmployee = async function getEmployee(req, res) {
  try {
    const response = await pg.query("SELECT * FROM employee");
    res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getOneEmployee = async function getOneEmployee(req, res) {
  try {
    const { id } = req.params;
    const response = await pg.query("SELECT * FROM employee WHERE id = $1", [id]);
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteEmployee = async function deleteEmployee(req, res) {
  try {
    const { id } = req.params;
    const response = await pg.query("DELETE FROM employee WHERE id = $1 RETURNING *", [id]);
    
    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = async function updateEmployee(req, res) {
  try {
    const { id } = req.params;
    const { name, division, salary, address } = req.body;

    if (!name || !division || !salary || !address) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const response = await pg.query(
      `UPDATE employee SET name = $1, division = $2, salary = $3, address = $4 WHERE id = $5 RETURNING *`,
      [name, division, salary, address, id]
    );

    if (response.rows.length === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(response.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


