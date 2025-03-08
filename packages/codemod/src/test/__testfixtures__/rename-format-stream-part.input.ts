// @ts-nocheck
import { formatStreamPart } from 'ai-toolkit';

const response = new Response(formatStreamPart('text', cached));
