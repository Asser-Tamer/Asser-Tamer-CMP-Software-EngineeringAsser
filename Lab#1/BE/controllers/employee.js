const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

exports.deleteEmployee = async (req, res, next) => {
  const {id} = req.params;
  const index = employee.findIndex(employee => employee.id === id);
  if (index !== -1) {
    employee.splice(index, 1);
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
};

exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;
  employee.push({ id, name });
  res.sendStatus(201);
};