const Leads = require("../models").Leads;
const Validator = require("fastest-validator");

//to add new lead in to database

const addNewLead = async (req, res) => {
  const validationSchema = {
    description: { type: "string", optional: false },
    assignee_id: { type: "string", optional: false },
    covered_aread: { type: "string", optional: false },
    owner_name: { type: "string", optional: false },
    owner_email: { type: "string", optional: false },
    owner_phone: { type: "string", optional: false },
    owner_address: { type: "string", optional: false },
    owner_city: { type: "string", optional: false },
    owner_state: { type: "string", optional: false },
    owner_zipcode: { type: "string", optional: false },
    lead_budget: { type: "string", optional: false },
    lead_remark_followup: { type: "string", optional: false },
    lead_status: { type: "string", optional: false },
  };

  const v = new Validator();
  const validationResponse = v.validate(req.body, validationSchema);
  if (validationResponse !== true) {
    return res.status(422).json({
      messages: "Validation failed",
      errors: validationResponse,
    });
  } else {
    const post = {
      lead_id: Date.now(),
      generated_by: req.auth.userId,
      description: req.body.description,
      assignee_id: req.body.assignee_id,
      covered_aread: req.body.covered_aread,
      owner_name: req.body.owner_name,
      owner_email: req.body.owner_email,
      owner_phone: req.body.owner_phone,
      owner_address: req.body.owner_address,
      owner_city: req.body.owner_city,
      owner_state: req.body.owner_state,
      owner_country: req.body.owner_country,
      owner_zipcode: req.body.owner_zipcode,
      lead_budget: req.body.lead_budget,
      lead_remark_followup: req.body.lead_remark_followup,
      lead_status: req.body.lead_status,
    };
    Leads.create(post)
      .then((result) => {
        return res.status(200).json({
          message: "Lead has been created successfully",
          result: result,
        });
      })
      .catch((error) => {
        return res.status(300).json({
          message:
            "Something went wrong while creating lead, Please try again.. ",
          result: error,
        });
      });
  }
};

//to get all leads in table
const getAllLeads = async (req, res) => {
  Leads.findAll()
    .then((result) => {
      return res.status(200).json({
        message: "All leads fetched successfully",
        result: result,
      });
    })
    .catch((error) => {
      return res.status(400).json({
        message: "Something went wrong while fetching all the leads.",
        error: error,
      });
    });
};

const getLeadById = async (req, res) => {
  let id = req.params.id;
  Leads.findByPk(id)
    .then((result) => {
      return res.status(200).json({
        message: "Lead found",
        result: result,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Lead not found",
        result: err,
      });
    });
};

const updateLead = async (req, res) => {
  const validationSchema = {
    description: { type: "string", optional: false },
    assignee_id: { type: "string", optional: false },
    covered_aread: { type: "string", optional: false },
    owner_name: { type: "string", optional: false },
    owner_email: { type: "string", optional: false },
    owner_phone: { type: "number", optional: false, integer: true },
    owner_address: { type: "string", optional: false },
    owner_city: { type: "string", optional: false },
    owner_state: { type: "string", optional: false },
    owner_zipcode: { type: "string", optional: false },
    lead_budget: { type: "string", optional: false },
    lead_remark_followup: { type: "string", optional: false },
    lead_status: { type: "number", optional: false, integer: true },
  };
  const v = new Validator();
  const validationResponse = v.validate(req.body, validationSchema);
  if (validationResponse !== true) {
    return res.status(422).json({
      message: "validation failed",
      errors: validationResponse,
    });
  } else {
    const schema = {
      description: req.body.description,
      assignee_id: req.body.assignee_id,
      covered_aread: req.body.covered_aread,
      owner_name: req.body.owner_name,
      owner_email: req.body.owner_email,
      owner_phone: req.body.owner_phone,
      owner_address: req.body.owner_address,
      owner_city: req.body.owner_city,
      owner_state: req.body.owner_state,
      owner_country: req.body.owner_country,
      owner_zipcode: req.body.owner_zipcode,
      lead_budget: req.body.lead_budget,
      lead_remark_followup: req.body.lead_remark_followup,
      lead_status: req.body.lead_status,
    };
    let id = req.params.id;
    Leads.findOne({ where: { id: id } })
      .then((lead) => {
        if (lead) {
          lead.update(schema).then((result) => {
            return res.status(200).json({
              message: "Lead updated successfully!!",
              result: result,
            });
          });
        } else {
          return res.status(404).json({
            message: "Lead not found, Please check and try again!!",
          });
        }
      })
      .catch((error) => {
        return res.status(500).json({
          message: "Something went wrong, Please try again!!",
          error: error,
        });
      });
  }
};

module.exports = {
  getAllLeads: getAllLeads,
  addNewLead: addNewLead,
  getLeadById: getLeadById,
  updateLead: updateLead,
};
