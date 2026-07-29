import Link from "next/link";

const footerLinks = {
  menu: ["Products", "Newsletter", "Contact"],
  information: ["FAQs", "Preorder policy", "Privacy"],
};

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#deded8] bg-[#f7f7f4] px-6 py-10 text-[#1f2420] sm:px-10 lg:px-20">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.7fr_0.7fr_1fr]">
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">
            Remocha
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#686b65]">
            Premium handmade mochi preorder with a simple catalog and direct
            WhatsApp checkout.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Menu</h3>
          <div className="mt-4 space-y-3 text-sm text-[#686b65]">
            {footerLinks.menu.map((item) => (
              <Link
                key={item}
                href={item === "Products" ? "/products" : "/#products"}
                className="block transition hover:text-[#1f2420]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Information</h3>
          <div className="mt-4 space-y-3 text-sm text-[#686b65]">
            {footerLinks.information.map((item) => (
              <Link
                key={item}
                href="/#products"
                className="block transition hover:text-[#1f2420]"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold">Contact</h3>
          <div className="mt-4 space-y-3 text-sm leading-6 text-[#686b65]">
            <p>WhatsApp: +62 82225418088</p>
            <p>Email: hello@remocha.id</p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-4 border-t border-[#deded8] pt-6 text-xs text-[#858881] sm:flex-row sm:items-center sm:justify-between">
        <p>(c) 2026 Remocha. All rights reserved.</p>
        <p>Preorder system prototype.</p>
      </div>
    </footer>
  );
}
