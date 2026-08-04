import {
  decodeGoogleBase64,
  decodeGoogleBase64Bytes,
  handleDownloadGoogleBase64String,
} from "@src/utils/helpers/decode";
import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";

test("decodes a base64 encoded string", () => {
  const original = "hello world";

  const bytes = new TextEncoder().encode(original);

  const base64Url = btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  expect(decodeGoogleBase64(base64Url)).toBe(original);
});

test("decode a base64 encoded data and return its bytes", () => {
  const original = "hello world";

  const bytes = new TextEncoder().encode(original);

  const base64Url = btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const decodedBytes = decodeGoogleBase64Bytes(base64Url);

  expect(Array.from(decodedBytes)).toEqual(Array.from(bytes));
});

describe("handleDownloadGoogleBase64String", () => {
  let clickSpy: ReturnType<typeof vi.fn<() => void>>;
  let mockAnchor: Partial<HTMLAnchorElement>;
  let capturedBlob: Blob | undefined;
  let createObjectURLSpy: ReturnType<typeof vi.spyOn>;
  let revokeObjectURLSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    capturedBlob = undefined;

    createObjectURLSpy = vi
      .spyOn(URL, "createObjectURL")
      .mockImplementation((obj: Blob | MediaSource) => {
        capturedBlob = obj as Blob;
        return "blob:mock-url";
      });

    revokeObjectURLSpy = vi
      .spyOn(URL, "revokeObjectURL")
      .mockImplementation(() => {});

    clickSpy = vi.fn<() => void>();
    mockAnchor = { href: "", download: "", click: clickSpy };

    vi.spyOn(document, "createElement").mockReturnValue(
      mockAnchor as HTMLAnchorElement,
    );
    vi.spyOn(document.body, "appendChild").mockImplementation((n) => n);
    vi.spyOn(document.body, "removeChild").mockImplementation((n) => n);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("download a base64 encoded string as a file", async () => {
    const original = "hello world";
    const base64 = btoa(original);

    handleDownloadGoogleBase64String({ data: base64, fileName: "test.txt" });

    expect(createObjectURLSpy).toHaveBeenCalledTimes(1);
    expect(createObjectURLSpy).toHaveBeenCalledWith(expect.any(Blob));
    expect(document.createElement).toHaveBeenCalledWith("a");
    expect(mockAnchor.href).toBe("blob:mock-url");
    expect(mockAnchor.download).toBe("test.txt");
    expect(clickSpy).toHaveBeenCalledTimes(1);

    expect(capturedBlob).toBeInstanceOf(Blob);
    expect(capturedBlob!.type).toBe("application/octet-stream");

    const buffer = await capturedBlob!.arrayBuffer();
    const decodedText = new TextDecoder().decode(buffer);
    expect(decodedText).toBe(original);

    expect(revokeObjectURLSpy).toHaveBeenCalledWith("blob:mock-url");
  });
});
