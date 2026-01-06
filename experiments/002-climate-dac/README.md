# Experiment 002: Climate & Direct Air Capture (DAC)
## Optimizing Sorbents for CO2 Removal via AI

### Overview
This experiment leverages the OpenDAC 2023 dataset (40M DFT calculations) and machine learning to identify and optimize Metal-Organic Frameworks (MOFs) for direct air capture of CO2. The goal is to create a cost-to-scale predictor that guides climate tech companies toward the lowest-cost pathways from $600/ton (2024) to $150/ton (2030 target).

### Inputs
- **Data**: OpenDAC 2023 dataset (Meta FAIR + Georgia Tech) — 40M DFT relaxations, 170K MOF structures
- **Tools**: TensorFlow/PyTorch for ML, RDKit for molecular analysis, DFT baseline code (VASP/CP2K compatible)
- **Partners Needed**: Climeworks, Global Thermostat, carbon removal policy teams
- **Energy Data**: Grid carbon intensity, hydrogen cost projections, thermal energy requirements

### Outputs (6-month target)
1. **Jupyter Notebook**: "Optimizing MOF Sorbents for DAC using OpenDAC + AI"
2. **Trained ML Model**: Cost predictor (inputs: MOF structure, energy source, location → outputs: levelized cost of CO2)
3. **Interactive Dashboard**: Real-time DAC cost-to-scale model (Streamlit or Plotly)
4. **Technical Roadmap**: Pathway from $600/ton → $150/ton with material, energy, and scale drivers
5. **Open Dataset**: Predicted costs + performance metrics for 100+ MOFs under various scenarios
6. **Publication**: Technical article on RideWire blog + preprint submission

### Success Metrics
- Model validation: <10% RMSE on OpenDAC test set
- Material discovery: 5+ MOF candidates with >10% cost improvement vs. state-of-art
- Adoption: 2+ climate tech companies integrate dashboard for strategic planning
- Reach: 1000+ interactive sessions in first month post-launch
- Community: 3+ researchers join collaboration on cost reduction

### Timeline
**Weeks 1-4**: Data exploration, model training, validation  
**Weeks 5-8**: Dashboard development, scenario modeling, documentation  
**Weeks 9-12**: Partner integration testing, publication, community recruitment

### How to Contribute
1. **Data Scientists**: Improve ML architecture, add ensemble methods, hyperparameter tuning
2. **Climate Engineers**: Add thermal energy models, validate cost assumptions with real data
3. **Policy Researchers**: Integrate carbon price scenarios, government incentives, grid decarbonization timelines
4. **Visualization**: Improve dashboard UX, add 3D MOF structure viewers

### Getting Started
```bash
# Clone the repo
git clone https://github.com/STEPHENIESGEM/-ridewire-ai-hub.git
cd experiments/002-climate-dac

# Install dependencies
pip install -r requirements.txt

# Download OpenDAC 2023 dataset (2.5 GB)
python scripts/download_opendac.py

# Train baseline model
jupyter notebook intelligence-loop-dac.ipynb
```

### Key References
- OpenDAC 2023: https://open-dac.github.io
- Meta FAIR DAC Project: https://research.facebook.com/
- Climeworks: https://www.climeworks.com/
- Cost of CO2 removal: https://cdr.fission.codes/

### Issues & Collaboration
👉 [Open an issue](https://github.com/STEPHENIESGEM/-ridewire-ai-hub/issues) if you want to:
- Add a new MOF dataset
- Improve the cost model
- Deploy the dashboard to a specific region
- Partner on real-world validation

---

**Phase**: In Progress (Week 1 of 12)  
**Last Updated**: December 20, 2025  
**Lead**: RideWire Climate Command Center
