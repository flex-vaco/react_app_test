import { toAbsoluteUrl } from "../../../helpers";

const Pro = () => (
  <>
    {/* begin::License */}
    <div className="rounded border border-dashed border-gray-300 py-6 px-8 mb-5">
      {/* begin::Heading */}
      <div className="d-flex flex-stack mb-5">
        {/* begin::Price */}
        <h3 className="fs-3 fw-bolder mb-0">All-in License</h3>
        {/* end::Price */}

        {/* begin::Price */}
        {/* <div className="d-flex align-items-baseline ms-1">
          <span className="text-muted fs-5" style={{ marginRight: "0.15rem" }}>
            $
          </span>
          <span className="fw-bolder text-dark fs-1">59</span>
        </div> */}
        {/* end::Price */}
      </div>
      {/* end::Heading */}

      {/* begin::Description */}
      <div className="fs-5 fw-bold mb-7">
        <span className="text-gray-500">
          Unlimited End Products and SaaS sites with paying users
        </span>{" "}
        <a className="explore-link" href="https://keenthemes.com/licensing">
          License Terms
        </a>
      </div>
      {/* end::Description */}

      {/* begin::Purchase */}
      <div className="mb-7">
        <a
          href="https://keenthemes.com/products/start-react-pro"
          className="btn btn-lg explore-btn-primary w-100"
        >
          Buy Now
        </a>
      </div>
      {/* end::Purchase */}

      {/* begin::Payment info */}
      <div className="d-flex flex-column flex-center mb-3">
        {/* begin::Heading */}
        <div className="mb-3 text-gray-500 fw-bold fs-6">
          Secured Payment by{" "}
          <a
            href="https://www.2checkout.com/"
            target="_black"
            className="fw-bolder text-dark explore-link-hover me-1"
          >
            2Checkout
          </a>{" "}
          with:
        </div>
        {/* end::Heading */}

        {/* begin::Payment methods */}
        <div className="mb-2">
          <img
            alt=""
            src={toAbsoluteUrl("/media/svg/payment-methods/paypal.svg")}
            className="h-30px me-3 rounded-1"
          />
          <img
            alt=""
            src={toAbsoluteUrl("/media/svg/payment-methods/visa.svg")}
            className="h-30px me-3 rounded-1"
          />

          <img
            alt=""
            src={toAbsoluteUrl("/media/svg/payment-methods/mastercard.svg")}
            className="h-30px me-3 rounded-1"
          />

          <img
            alt=""
            src={toAbsoluteUrl(
              "/media/svg/payment-methods/americanexpress.svg"
            )}
            className="h-30px me-3 rounded-1"
          />
        </div>
        {/* end::Payment methods */}

        {/* begin::Notice */}
        <div className="text-gray-400 fs-7">100% money back guarantee!</div>
        {/* end::Notice */}
      </div>
      {/* end::Payment info */}
    </div>
    {/* end::Licenses */}
  </>
);

export { Pro };
