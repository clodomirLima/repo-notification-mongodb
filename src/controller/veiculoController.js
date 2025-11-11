const VeiculoService = require("../service/veiculoService");

class VeiculoController {
  async findAllVeiculos() {
    const veiculoService = new VeiculoService();

    const result = await veiculoService.findAllVeiculos({
      raw: true,
    });
    return result;
  }

  async findByIdVeiculo(id, res) {
    const veiculoService = new VeiculoService();

    const result = await veiculoService.findByIdVeiculo(id, res);
    return result;
  }

  async createVeiculo(body, res) {
    const veiculoService = new VeiculoService();

    const result = await veiculoService.createVeiculo(body, res);
    return result;
  }

  async updateVeiculo(id, body, res) {
    const veiculoService = new VeiculoService();

    const result = await veiculoService.updateVeiculo(id, body, res);
    return result;
  }

  async deletarVeiculo(id, res) {
    const veiculoService = new VeiculoService();

    const result = await veiculoService.deletarVeiculo(id, res);
    return result;
  }
}

module.exports = VeiculoController;
