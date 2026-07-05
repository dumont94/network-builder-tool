/**
 * NetworkDiagram.jsx — ASCII-style topology for the chosen track.
 *
 * Rendered in a <pre> with Space Mono for perfect character alignment.
 * The build-order recap below walks how the phases connect end to end.
 */

const DIAGRAMS = {
  cisco: `
              [ ISP ]  203.0.113.1
                  |  Gi0/1  (ip nat outside)
         +--------+---------+
         |   IOS-XE Router  |   OSPF area 0 . PAT . IKEv2 IPsec
         +--------+---------+
                  |  Gi0/24  802.1Q trunk (10,20,30,99)
         +--------+---------+
         |  Catalyst L3 SW  |   SVIs . DHCP . HSRP . RSTP
         +--+-----+-----+--++
            |     |     |   |
         VLAN10 VLAN20 VLAN30 VLAN99
          DATA  VOICE  GUEST  MGMT
`,
  fortinet: `
              [ ISP ]  203.0.113.1
                  |  wan1
         +--------+---------+
         |    FortiGate     |   Policy+NAT . OSPF . IPsec/SSL-VPN
         |    (FGCP a-p)    |
         +--------+---------+
                  |  FortiLink (LACP lag1)
         +--------+---------+
         |    FortiSwitch   |   VLANs 10/20/30/99
         +--+-----+-----+--++
            |     |     |   |
         vlan10 vlan20 vlan30 vlan99
          DATA  VOICE  GUEST  MGMT
`,
};

// Build-order recap — generic across both tracks
const BUILD_ORDER = [
  "Plan the addressing and VLAN map, then secure device management (SSH/HTTPS, admin creds, mgmt interface).",
  "Create VLANs and an 802.1Q trunk so one switch carries several isolated segments up to the routing layer.",
  "Give each VLAN a gateway (SVI or sub-interface) and a DHCP scope so endpoints get addressed automatically.",
  "Add a default route to the ISP and run OSPF internally so L3 devices learn each other's subnets.",
  "Translate private addresses to the public IP with PAT, and publish only the services you must with DNAT/VIP.",
  "Enforce segmentation with ACLs / firewall policies and harden Layer 2 (port-security, DHCP snooping).",
  "Remove single points of failure with STP, EtherChannel/LAG, and gateway/appliance redundancy (HSRP / FGCP).",
  "Extend the network securely with IPsec site-to-site and remote-access VPN.",
  "Prove it with ping/traceroute and show/get commands, then wire up NTP, syslog, and SNMP for monitoring.",
];

export default function NetworkDiagram({ track }) {
  const diagram = DIAGRAMS[track] || DIAGRAMS.cisco;

  return (
    <div className="diagram-section">
      <div className="diagram-section__title">Reference Topology</div>

      <div className="diagram-container">
        <pre className="diagram-pre">{diagram}</pre>
      </div>

      <div style={{ marginTop: "var(--space-6)" }}>
        <div className="diagram-section__title">Build Order Recap</div>
        <ol className="integration-steps">
          {BUILD_ORDER.map((step, i) => (
            <li key={i} className="integration-step">
              <span className="integration-step__text">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
