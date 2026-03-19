#!/bin/bash
set -e
G='\033[0;32m'; C='\033[0;36m'; Y='\033[1;33m'; N='\033[0m'

echo ""
echo -e "${C}╔════════════════════════════════════════════════╗${N}"
echo -e "${C}║  GRC Vault — Web Server Setup                  ║${N}"
echo -e "${C}║  Governance, Risk & Compliance Platform         ║${N}"
echo -e "${C}╚════════════════════════════════════════════════╝${N}"
echo ""

if ! command -v node &> /dev/null; then
    echo -e "${Y}Node.js 18+ is required. Install from https://nodejs.org${N}"
    exit 1
fi
echo -e "${G}✓${N} Node.js $(node -v) detected"

echo -e "\n${C}Installing dependencies...${N}"
npm install --production
echo -e "${G}✓${N} Dependencies installed"

echo ""
echo "Options:"
echo "  1) Start server (foreground)"
echo "  2) Install as systemd service"
echo "  3) Exit"
echo ""
read -p "Choose [1-3]: " choice

case $choice in
  1)
    echo -e "\n${C}Starting GRC Vault on http://localhost:${PORT:-3000}${N}\n"
    npm start
    ;;
  2)
    echo -e "\n${C}Installing systemd service...${N}"
    INSTALL_DIR=$(pwd)
    sudo useradd -r -s /bin/false grcvault 2>/dev/null || true
    sudo cp grc-vault.service /etc/systemd/system/
    sudo sed -i "s|/opt/grc-vault|${INSTALL_DIR}|g" /etc/systemd/system/grc-vault.service
    sudo chown -R grcvault:grcvault "${INSTALL_DIR}"
    sudo systemctl daemon-reload
    sudo systemctl enable grc-vault
    sudo systemctl start grc-vault
    echo -e "\n${G}✓${N} Service installed and started"
    echo -e "  Access at: ${C}http://localhost:${PORT:-3000}${N}"
    echo -e "  Status:    sudo systemctl status grc-vault"
    echo -e "  Logs:      sudo journalctl -u grc-vault -f"
    ;;
  *)
    echo "Run 'npm start' to launch manually."
    ;;
esac
