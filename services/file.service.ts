"use server"; // services/image-crud.ts
const API_BASE = process.env.IMAGE_CRUD_SERVER || "http://localhost:5000";
const API_KEY = process.env.IMAGE_CRUD_KEY || "";

export interface ImageResponse {
  message: string;
  url?: string;
}

export interface ImageListResponse {
  images: string[];
}

// 1. List Images (Public - No auth needed)
export const listImages = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE}/images`);

  if (!response.ok) {
    throw new Error(`Failed to fetch images: ${response.status}`);
  }

  const data = await response.json();
  return data; // Returns array of "/uploads/filename.jpg"
};

// 2. Upload Image (Requires API key)
export const uploadImage = async (file: File): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API key not configured");
  }

  if (file.size > 5 * 1024 * 1024) {
    // 5MB limit
    throw new Error("File too large. Max 5MB");
  }

  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`${API_BASE}/images`, {
    method: "POST",
    body: formData,
    headers: {
      "x-upload-key": API_KEY,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as ImageResponse;
  console.log(await getImageUrl(data.url || ""));

  return getImageUrl(data.url || "");
};

// 3. Delete Image (Requires API key)
export const deleteImage = async (filename: string): Promise<ImageResponse> => {
  if (!API_KEY) {
    throw new Error("API key not configured");
  }

  if (!filename.match(/^\d+-\d+\.(jpeg|jpg|png)$/)) {
    throw new Error("Invalid filename format");
  }

  const response = await fetch(`${API_BASE}/images/${filename}`, {
    method: "DELETE",
    headers: {
      "x-upload-key": API_KEY,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Delete failed: ${response.status} ${errorText}`);
  }

  return response.json();
};

// 4. Get Image URL (Public - No auth needed)
export const getImageUrl = async (filename: string): Promise<string> => {
  return `${API_BASE}${filename}`;
};
